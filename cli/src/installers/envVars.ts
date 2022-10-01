import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

const getEnvFiles = (usingAuth?: boolean, usingPrisma?: boolean) => {
  if (usingAuth && usingPrisma) {
    return {
      envSchemaFile: "auth-prisma-schema.mjs",
      envFileOverride: "auth-prisma.env-example",
    };
  }

  if (usingPrisma) {
    return {
      envSchemaFile: "prisma-schema.mjs",
      envFileOverride: "prisma.env-example",
    };
  }
  return {
    envSchemaFile: "auth-schema.mjs",
    envFileOverride: "auth.env-example",
  };
};

export const envVariablesInstaller: Installer = async ({
  projectDir,
  packages,
}) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  if (!usingAuth && !usingPrisma) {
    return;
  }

  const envAssetDir = path.join(PKG_ROOT, "template/addons/env");

  const { envSchemaFile, envFileOverride } = getEnvFiles(
    usingAuth,
    usingPrisma,
  );

  // override base env file with auth-specific env vars
  const envSchemaSrc = path.join(envAssetDir, envSchemaFile);
  const envSchemaDest = path.join(projectDir, "src/env/schema.mjs");

  const envFileSrc = path.join(envAssetDir, envFileOverride);

  const envExampleDest = path.join(projectDir, ".env-example");
  const envDest = path.join(projectDir, ".env");

  await Promise.all([
    fs.copy(envSchemaSrc, envSchemaDest, { overwrite: true }),
    fs.rename(envExampleDest, envDest),
    fs.copy(envFileSrc, envDest),
    fs.copy(envFileSrc, envExampleDest),
  ]);
};
