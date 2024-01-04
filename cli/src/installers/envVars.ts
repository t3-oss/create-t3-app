import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type DatabaseProvider, type Installer } from "~/installers/index.js";

export const envVariablesInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
  projectName,
}) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const usingDb = usingPrisma || usingDrizzle;

  const envContent = getEnvContent(
    !!usingAuth,
    !!usingPrisma,
    !!usingDrizzle,
    databaseProvider,
    projectName
  );

  let envFile = "";
  if (usingAuth && usingDb) envFile = "with-auth-db.js";
  else if (usingAuth) envFile = "with-auth.js";
  else if (usingDb) envFile = "with-db.js";

  if (envFile !== "") {
    const envSchemaSrc = path.join(
      PKG_ROOT,
      "template/extras/src/env",
      envFile
    );
    const envFileText = fs.readFileSync(envSchemaSrc, "utf-8");
    const envSchemaDest = path.join(projectDir, "src/env.js");
    fs.writeFileSync(
      envSchemaDest,
      databaseProvider === "sqlite"
        ? envFileText.replace("\n      .url()", "")
        : envFileText,
      "utf-8"
    );
  }

  const envDest = path.join(projectDir, ".env");
  const envExampleDest = path.join(projectDir, ".env.example");

  fs.writeFileSync(envDest, envContent, "utf-8");
  fs.writeFileSync(envExampleDest, exampleEnvContent + envContent, "utf-8");
};

const getEnvContent = (
  usingAuth: boolean,
  usingPrisma: boolean,
  usingDrizzle: boolean,
  databaseProvider: DatabaseProvider,
  projectName: string
) => {
  let content = `
# When adding additional environment variables, the schema in "/src/env.js"
# should be updated accordingly.
`
    .trim()
    .concat("\n");

  if (usingPrisma)
    content += `
# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
`;

  if (usingDrizzle) content += "\n# Drizzle\n";

  if (usingPrisma || usingDrizzle) {
    if (databaseProvider === "planetscale") {
      if (usingDrizzle) {
        content += `Get the Database URL from the "prisma" dropdown selector in PlanetScale. 
# Change the query params at the end of the URL to "?ssl={"rejectUnauthorized":true}"
DATABASE_URL='mysql://YOUR_MYSQL_URL_HERE?ssl={"rejectUnauthorized":true}'`;
      } else {
        content = `Get the Database URL from the "prisma" dropdown selector in PlanetScale. 
DATABASE_URL='mysql://YOUR_MYSQL_URL_HERE?sslaccept=strict'`;
      }
    } else if (databaseProvider === "mysql") {
      content += `DATABASE_URL="mysql://root:password@localhost:3306/${projectName}"`;
    } else if (databaseProvider === "postgres") {
      content += `DATABASE_URL="postgresql://postgres:password@localhost:5432/${projectName}"`;
    } else if (databaseProvider === "sqlite") {
      content += usingPrisma
        ? 'DATABASE_URL="file:./db.sqlite"'
        : 'DATABASE_URL="db.sqlite"';
    }
    content += "\n";
  }

  if (usingAuth)
    content += `
# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
`;

  if (!usingAuth && !usingPrisma)
    content += `
# Example:
# SERVERVAR="foo"
# NEXT_PUBLIC_CLIENTVAR="bar"
`;

  return content;
};

const exampleEnvContent = `
# Since the ".env" file is gitignored, you can use the ".env.example" file to
# build a new ".env" file when you clone the repo. Keep this file up-to-date
# when you add new variables to \`.env\`.

# This file will be committed to version control, so make sure not to have any
# secrets in it. If you are cloning this repo, create a copy of this file named
# ".env" and populate it with your secrets.
`
  .trim()
  .concat("\n\n");
