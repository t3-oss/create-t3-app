import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import type { Installer } from "~/installers/index.js";

export const trpcInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "@tanstack/react-query",
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react",
    ],
    devMode: false,
  });

  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const trpcAssetDir = path.join(PKG_ROOT, "template/addons/trpc");

  const apiHandlerSrc = path.join(trpcAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");

  const utilsSrc = path.join(trpcAssetDir, "utils.ts");
  const utilsDest = path.join(projectDir, "src/utils/trpc.ts");

  const serverUtilFile = usingAuth ? "auth-server-utils.ts" : "server-utils.ts";
  const serverUtilSrc = path.join(trpcAssetDir, serverUtilFile);
  const serverUtilDest = path.join(projectDir, "src/server/trpc/trpc.ts");

  const contextFile =
    usingAuth && usingPrisma
      ? "auth-prisma-context.ts"
      : usingAuth && !usingPrisma
      ? "auth-context.ts"
      : !usingAuth && usingPrisma
      ? "prisma-context.ts"
      : "base-context.ts";
  const contextSrc = path.join(trpcAssetDir, contextFile);
  const contextDest = path.join(projectDir, "src/server/trpc/context.ts");

  const authRouterSrc = path.join(trpcAssetDir, "auth-router.ts");
  const authRouterDest = path.join(
    projectDir,
    "src/server/trpc/router/auth.ts",
  );

  const indexRouterFile = usingAuth ? "auth-app-router.ts" : "app-router.ts";
  const indexRouterSrc = path.join(trpcAssetDir, indexRouterFile);
  const indexRouterDest = path.join(
    projectDir,
    "src/server/trpc/router/_app.ts",
  );

  const exampleRouterFile = usingPrisma
    ? "example-prisma-router.ts"
    : "example-router.ts";
  const exampleRouterSrc = path.join(trpcAssetDir, exampleRouterFile);
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/trpc/router/example.ts",
  );

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(utilsSrc, utilsDest);
  fs.copySync(serverUtilSrc, serverUtilDest);
  fs.copySync(contextSrc, contextDest);
  fs.copySync(indexRouterSrc, indexRouterDest);
  fs.copySync(exampleRouterSrc, exampleRouterDest);
  usingAuth && fs.copySync(authRouterSrc, authRouterDest);
};
