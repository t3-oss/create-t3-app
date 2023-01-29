import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const envVariablesInstaller: Installer = ({ projectDir, packages }) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const envContent = getEnvContent(!!usingAuth, !!usingPrisma);

  const envSchemaFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.mjs"
      : usingAuth
      ? "with-auth.mjs"
      : usingPrisma
      ? "with-prisma.mjs"
      : "";

  if (envSchemaFile !== "") {
    const envSchemaSrc = path.join(
      PKG_ROOT,
      "template/extras/src/env/schema",
      envSchemaFile,
    );
    const envSchemaDest = path.join(projectDir, "src/env/schema.mjs");
    fs.copySync(envSchemaSrc, envSchemaDest);
  }

  const envDest = path.join(projectDir, ".env");
  const envExampleDest = path.join(projectDir, ".env.example");

  fs.writeFileSync(envDest, envContent, "utf-8");
  fs.writeFileSync(envExampleDest, exampleEnvContent + envContent, "utf-8");
};

const getEnvContent = (usingAuth: boolean, usingPrisma: boolean) => {
  let content = `
# When adding additional environment variables, the schema in "/env/schema.mjs"
# should be updated accordingly.
`
    .trim()
    .concat("\n");

  if (usingPrisma)
    content += `
# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"
`;

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
