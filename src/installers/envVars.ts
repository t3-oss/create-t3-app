import type { Installer } from "./index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";

export const envVariblesInstaller: Installer = async ({
  projectDir,
  packages,
}) => {
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const envAssetDir = path.join(PKG_ROOT, "template/addons/env");

  let envFile = "";

  switch (true) {
    case usingAuth && usingPrisma:
      envFile = "env-prisma-auth.mjs";
      break;
    case usingAuth:
      envFile = "env-auth.mjs";
      break;
    case usingPrisma:
      envFile = "env-prisma.mjs";
      break;
  }

  if (!envFile) return;

  const envSchemaSrc = path.join(envAssetDir, envFile);
  const envSchemaDest = path.join(projectDir, "src/server/env-schema.mjs");

  await fs.copy(envSchemaSrc, envSchemaDest, { overwrite: true });
};
