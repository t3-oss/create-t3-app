import type { Installer } from "~/installers/index.js";
import { AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextAuthInstaller: Installer = ({ projectDir, packages }) => {
  const usingPrisma = packages?.prisma.inUse;
  const deps: AvailableDependencies[] = ["next-auth"];
  if (usingPrisma) deps.push("@next-auth/prisma-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerFile = "src/pages/api/auth/[...nextauth].ts";
  const apiHandlerSrc = path.join(extrasDir, apiHandlerFile);
  const apiHandlerDest = path.join(projectDir, apiHandlerFile);

  const authConfigSrc = path.join(
    extrasDir,
    "src/server/auth",
    usingPrisma ? "with-prisma.ts" : "base.ts",
  );
  const authConfigDest = path.join(projectDir, "src/server/auth.ts");

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(authConfigSrc, authConfigDest);
};
