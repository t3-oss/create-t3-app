import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextAuthInstaller: Installer = ({ projectDir, packages }) => {
  const usingPrisma = packages?.prisma.inUse;
  const usingDrizzle = packages?.drizzle.inUse;

  const deps: AvailableDependencies[] = ["next-auth"];
  if (usingPrisma) deps.push("@next-auth/prisma-adapter");
  // This adapter is not yet available on npm so we have our own inhoused
  // if (usingDrizzle) deps.push("@next-auth/drizzle-adapter");

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
    usingPrisma
      ? "with-prisma.ts"
      : usingDrizzle
      ? "with-drizzle.ts"
      : "base.ts"
  );
  const authConfigDest = path.join(projectDir, "src/server/auth.ts");

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(authConfigSrc, authConfigDest);
};
