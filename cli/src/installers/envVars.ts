import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const envVariablesInstaller: Installer = async ({
  projectDir,
  packages,
}) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const envAssetDir = path.join(PKG_ROOT, "template/addons/env");

  let envFile = "";
  let envExample = "";

  switch (true) {
    case usingAuth && usingPrisma:
      envFile = "auth-prisma-schema.mjs";
      envExample = "auth-prisma.env-example";
      break;
    case usingAuth:
      envFile = "auth-schema.mjs";
      envExample = "auth.env-example";
      break;
    case usingPrisma:
      envFile = "prisma-schema.mjs";
      envExample = "prisma.env-example";
      break;
  }

  if (!envFile || !envExample) return;

  const envSchemaSrc = path.join(envAssetDir, envFile);
  const envSchemaDest = path.join(projectDir, "src/env/schema.mjs");

  const envExampleSrc = path.join(envAssetDir, envExample);
  const envDest = path.join(projectDir, ".env");

  await Promise.all([
    fs.copy(envSchemaSrc, envSchemaDest, { overwrite: true }),
    fs.copy(envExampleSrc, envDest, { overwrite: true }),
  ]);
};
