import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type DatabaseProvider, type Installer } from "~/installers/index.js";

export const envVariablesInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
}) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const usingDb = usingPrisma || usingDrizzle;

  const envContent = getEnvContent(
    !!usingAuth,
    !!usingPrisma,
    !!usingDrizzle,
    databaseProvider
  );

  const envFile =
    usingAuth && usingDb
      ? "with-auth-db.mjs"
      : usingAuth
      ? "with-auth.mjs"
      : usingDb
      ? "with-db.mjs"
      : "";

  if (envFile !== "") {
    const envSchemaSrc = path.join(
      PKG_ROOT,
      "template/extras/src/env",
      envFile
    );
    const envSchemaDest = path.join(projectDir, "src/env.mjs");
    fs.copySync(envSchemaSrc, envSchemaDest);
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
  databaseProvider: DatabaseProvider
) => {
  let content = `
# When adding additional environment variables, the schema in "/src/env.mjs"
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
      content += `Get the Database URL from the "prisma" dropdown selector in PlanetScale. 
      # Change the query params at the end of the URL to "?ssl={"rejectUnauthorized":true}"
      DATABASE_URL='mysql://YOUR_MYSQL_URL_HERE?ssl={"rejectUnauthorized":true}'`;
    } else if (databaseProvider === "mysql") {
      content += `DATABASE_URL='mysql://username:password@localhost:3306/db_name?schema=public'`;
    } else if (databaseProvider === "postgres") {
      content += `DATABASE_URL='postgresql://username:password@localhost:5432/db_name?schema=public'`;
    } else if (databaseProvider === "sqlite") {
      content += `DATABASE_URL='file:./db.sqlite'`;
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
