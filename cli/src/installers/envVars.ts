import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const envVariablesInstaller: Installer = ({ projectDir, packages }) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const envAssetDir = path.join(PKG_ROOT, "template/addons/env");

  let envFile = "";
  let envContent =
    "# When adding additional env variables, the schema in /env/schema.mjs should be updated accordingly\n";

  switch (true) {
    case usingAuth && usingPrisma:
      envFile = "auth-prisma-schema.mjs";
      break;
    case usingAuth:
      envFile = "auth-schema.mjs";
      break;
    case usingPrisma:
      envFile = "prisma-schema.mjs";
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
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
`;
  }

  if (!envFile) return;

  const envSchemaSrc = path.join(envAssetDir, envFile);
  const envSchemaDest = path.join(projectDir, "src/env/schema.mjs");

  const envDest = path.join(projectDir, ".env");

  fs.copySync(envSchemaSrc, envSchemaDest);
  fs.writeFileSync(envDest, envContent, "utf-8");
};
