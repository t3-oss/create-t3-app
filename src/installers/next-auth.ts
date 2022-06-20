import { installPkgs } from "../helpers/getPkgManager";
import type { Installer } from "../index";
import fs from "fs-extra";
import path from "path";

export const nextAuthInstaller: Installer = async (
  projectDir,
  packageManager,
  packages
) => {
  await installPkgs(packageManager, false, projectDir, [
    "next-auth",
    packages?.prisma.inUse ? "@next-auth/prisma-adapter" : "",
  ]);

  const nextAuthAssetDir = path.join(
    __dirname,
    "../../",
    "template/addons/next-auth"
  );

  const apiHandlerSrc = path.join(
    nextAuthAssetDir,
    packages?.prisma.inUse ? "api-handler-prisma.ts" : "api-handler.ts"
  );
  const apiHandlerDest = path.join(
    projectDir,
    "src/pages/api/auth/[...nextauth].ts"
  );

  const restrictedApiSrc = path.join(nextAuthAssetDir, "restricted.ts");
  const restrictedApiDest = path.join(
    projectDir,
    "src/pages/api/restricted.ts"
  );

  await Promise.all([
    fs.copy(apiHandlerSrc, apiHandlerDest),
    fs.copy(restrictedApiSrc, restrictedApiDest),
  ]);
};
