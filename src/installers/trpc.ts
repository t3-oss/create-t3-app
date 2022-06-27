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

  const trpcAssetDir = path.join(PKG_ROOT, "template/addons/trpc");

  const apiHandlerSrc = path.join(trpcAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");

  const utilsSrc = path.join(trpcAssetDir, "utils.ts");
  const utilsDest = path.join(projectDir, "src/utils/trpc.ts");

  const contextSrc = path.join(
    trpcAssetDir,
    packages.prisma.inUse ? "prisma-context.ts" : "base-context.ts",
  );
  const contextDest = path.join(projectDir, "src/server/router/context.ts");

  const routerSrc = path.join(trpcAssetDir, "index-router.ts");
  const routerDest = path.join(projectDir, "src/server/router/index.ts");

  const exampleRouterSrc = path.join(
    trpcAssetDir,
    packages.prisma.inUse ? "example-prisma-router.ts" : "example-router.ts",
  );
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/router/example.ts",
  );

  await Promise.all([
    fs.copy(apiHandlerSrc, apiHandlerDest),
    fs.copy(utilsSrc, utilsDest),
    fs.copy(contextSrc, contextDest),
    fs.copy(routerSrc, routerDest),
    fs.copy(exampleRouterSrc, exampleRouterDest),
  ]);
};
