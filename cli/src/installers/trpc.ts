import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

export const trpcInstaller: Installer = async ({
  projectDir,
  packages,
  runPkgManagerInstall,
}) => {
  await runPkgManagerInstall({
    packages: [
      "react-query@3.39.2",
      "superjson",
      "@trpc/server",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react",
    ],
  });
  const usingAuth = packages?.nextAuth.inUse;
  const usingPrisma = packages?.prisma.inUse;

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

  const protectedExampleRouterSrc = path.join(
    trpcAssetDir,
    "protected-example-router.ts",
  );
  const protectedExampleRouterDest = path.join(
    projectDir,
    "src/server/router/protected-example-router.ts",
  );

  const protectedRouterSrc = path.join(trpcAssetDir, "protected-router.ts");
  const protectedRouterDest = path.join(
    projectDir,
    "src/server/router/protected-router.ts",
  );

  await Promise.all([
    fs.copy(apiHandlerSrc, apiHandlerDest),
    fs.copy(utilsSrc, utilsDest),
    fs.copy(contextSrc, contextDest),
    fs.copy(indexRouterSrc, indexRouterDest),
    fs.copy(exampleRouterSrc, exampleRouterDest),
    ...(usingAuth
      ? [
          fs.copy(protectedExampleRouterSrc, protectedExampleRouterDest),
          fs.copy(protectedRouterSrc, protectedRouterDest),
        ]
      : []),
  ]);
};
