import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const envVariablesInstaller: Installer = ({ projectDir, packages }) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const envAssetDir = path.join(PKG_ROOT, "template/addons/env");

  let envSchemaFile = "";
  let envContent =
    "# When adding additional env variables, the schema in /env/schema.mjs should be updated accordingly\n";

  switch (true) {
    case usingAuth && usingPrisma:
      envSchemaFile = "auth-prisma-schema.mjs";
      break;
    case usingAuth:
      envSchemaFile = "auth-schema.mjs";
      break;
    case usingPrisma:
      envSchemaFile = "prisma-schema.mjs";
      break;
  }

  if (usingPrisma) {
    envContent += `
# Prisma
DATABASE_URL=file:./db.sqlite
`;
  }
  if (usingAuth) {
    envContent += `
# Next Auth
# You can generate the secret via 'openssl rand -base64 32' on Linux
# More info: https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
`;
  }

  if (!envSchemaFile) {
    envContent += `
# Example:
# SERVERVAR=foo
# NEXT_PUBLIC_CLIENTVAR=bar
`;
  }

  const envExampleContent =
    `# Since .env is gitignored, you can use .env.example to build a new \`.env\` file when you clone the repo.
# Keep this file up-to-date when you add new variables to \`.env\`.

# This file will be committed to version control, so make sure not to have any secrets in it.
# If you are cloning this repo, create a copy of this file named \`.env\` and populate it with your secrets.

` + envContent;

  if (envSchemaFile) {
    const envSchemaSrc = path.join(envAssetDir, envSchemaFile);
    const envSchemaDest = path.join(projectDir, "src/env/schema.mjs");
    fs.copySync(envSchemaSrc, envSchemaDest);
  }

  const envDest = path.join(projectDir, ".env");
  const envExampleDest = path.join(projectDir, ".env.example");

  fs.writeFileSync(envDest, envContent, "utf-8");
  fs.writeFileSync(envExampleDest, envExampleContent, "utf-8");
};
