import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import fs from "fs-extra";

export const trpcInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@tanstack/react-query",
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react-query",
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const apiHandlerSrc = path.join(extrasDir, "src/pages/api/trpc/[trpc].ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");

  const utilsSrc = path.join(extrasDir, "src/utils/api.ts");
  const utilsDest = path.join(projectDir, "src/utils/api.ts");

  const trpcFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth
      ? "with-auth.ts"
      : usingPrisma
      ? "with-prisma.ts"
      : "base.ts";
  const trpcSrc = path.join(extrasDir, "src/server/api/trpc", trpcFile);
  const trpcDest = path.join(projectDir, "src/server/api/trpc.ts");

  const rootRouterSrc = path.join(extrasDir, "src/server/api/root.ts");
  const rootRouterDest = path.join(projectDir, "src/server/api/root.ts");

  const exampleRouterFile =
    usingAuth && usingPrisma
      ? "with-auth-prisma.ts"
      : usingAuth
      ? "with-auth.ts"
      : usingPrisma
      ? "with-prisma.ts"
      : "base.ts";

  const exampleRouterSrc = path.join(
    extrasDir,
    "src/server/api/routers/example",
    exampleRouterFile
  );
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/api/routers/example.ts"
  );

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(utilsSrc, utilsDest);
  fs.copySync(trpcSrc, trpcDest);
  fs.copySync(rootRouterSrc, rootRouterDest);
  fs.copySync(exampleRouterSrc, exampleRouterDest);
};
