import type { Installer } from "./index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";
import { runPkgManagerInstall } from "../utils/runPkgManagerInstall.js";

export const trpc10Installer: Installer = async ({
  projectDir,
  pkgManager,
  packages,
  noInstall,
}) => {
  await runPkgManagerInstall({
    pkgManager,
    projectDir,
    packages: [
      "react-query",
      "superjson",
      "@trpc/server@experimental",
      "@trpc/client@experimental",
      "@trpc/next@experimental",
      "@trpc/react@experimental",
    ],
    devMode: false,
    noInstallMode: noInstall,
  });
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

  const trpcAssetDir = path.join(PKG_ROOT, "template/addons/trpc10");

  const apiHandlerSrc = path.join(trpcAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");

  const utilsSrc = path.join(trpcAssetDir, "utils.ts");
  const utilsDest = path.join(projectDir, "src/utils/trpc.ts");

  const serverTRPCSrc = path.join(trpcAssetDir, "server-trpc.ts");
  const serverTRPCDest = path.join(projectDir, "src/server/trpc.ts");

  const contextFile =
    usingAuth && usingPrisma
      ? "auth-prisma-context.ts"
      : usingAuth && !usingPrisma
      ? "auth-context.ts"
      : !usingAuth && usingPrisma
      ? "prisma-context.ts"
      : "base-context.ts";
  const contextSrc = path.join(trpcAssetDir, contextFile);
  const contextDest = path.join(projectDir, "src/server/router/context.ts");

  const indexRouterFile = usingAuth
    ? "auth-index-router.ts"
    : "index-router.ts";
  const indexRouterSrc = path.join(trpcAssetDir, indexRouterFile);
  const indexRouterDest = path.join(projectDir, "src/server/router/index.ts");

  const exampleRouterFile = usingPrisma
    ? "example-prisma-router.ts"
    : "example-router.ts";
  const exampleRouterSrc = path.join(trpcAssetDir, exampleRouterFile);
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/router/example.ts",
  );

  await Promise.all([
    fs.copy(apiHandlerSrc, apiHandlerDest),
    fs.copy(utilsSrc, utilsDest),
    fs.copy(serverTRPCSrc, serverTRPCDest),
    fs.copy(contextSrc, contextDest),
    fs.copy(indexRouterSrc, indexRouterDest),
    fs.copy(exampleRouterSrc, exampleRouterDest),
  ]);
};
