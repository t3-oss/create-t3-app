import type { Installer } from "./index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";
import { runPkgManagerInstall } from "../utils/runPkgManagerInstall.js";

export const trpcInstaller: Installer = async (
  projectDir,
  packageManager,
  packages,
) => {
  await runPkgManagerInstall({
    packageManager,
    projectDir,
    packages: [
      "react-query",
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react",
      "zod",
    ],
    devMode: false,
  });
  const usingAuth = packages.nextAuth.inUse;
  const usingPrisma = packages.prisma.inUse;

  const trpcAssetDir = path.join(PKG_ROOT, "template/addons/trpc");

  const apiHandlerSrc = path.join(trpcAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");

  const utilsSrc = path.join(trpcAssetDir, "utils.ts");
  const utilsDest = path.join(projectDir, "src/utils/trpc.ts");

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

  if (usingAuth) {
    const authRouterSrc = path.join(trpcAssetDir, "auth-router.ts");
    const authRouterDest = path.join(projectDir, "src/server/router/auth.ts");
    console.log("copying over");
    await fs.copy(authRouterSrc, authRouterDest);
  }

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
    fs.copy(contextSrc, contextDest),
    fs.copy(indexRouterSrc, indexRouterDest),
    fs.copy(exampleRouterSrc, exampleRouterDest),
  ]);
};
