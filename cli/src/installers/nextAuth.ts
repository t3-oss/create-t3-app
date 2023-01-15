import type { Installer } from "~/installers/index.js";
import { AvailableDependencies } from "~/installers/dependencyVersionMap.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextAuthInstaller: Installer = ({ projectDir, packages }) => {
  const deps: AvailableDependencies[] = ["next-auth"];
  if (packages?.prisma.inUse) deps.push("@next-auth/prisma-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerSrc = path.join(
    extrasDir,
    "src/pages/api/auth/[...nextauth]",
    packages?.prisma.inUse ? "with-prisma.ts" : "base.ts",
  );
  const apiHandlerDest = path.join(
    projectDir,
    "src/pages/api/auth/[...nextauth].ts",
  );

  const getServerAuthSessionSrc = path.join(extrasDir, "src/server/auth.ts");
  const getServerAuthSessionDest = path.join(projectDir, "src/server/auth.ts");

  const nextAuthDTSSrc = path.join(extrasDir, "src/types/next-auth.d.ts");
  const nextAuthDTSDest = path.join(projectDir, "src/types/next-auth.d.ts");

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(getServerAuthSessionSrc, getServerAuthSessionDest);
  fs.copySync(nextAuthDTSSrc, nextAuthDTSDest);
};
