import { installPkgs } from "../helpers/getPkgManager";
import fs from "fs-extra";
import path from "path";
import { type Installer } from "../index";

export const trpcInstaller: Installer = async (projectDir, pkgManager) => {
  await installPkgs(pkgManager, false, projectDir, [
    "@trpc/server",
    "@trpc/client",
    "@trpc/next",
    "@trpc/react",
    "superjson",
    "zod",
  ]);

  const trpcAssetDir = path.join(__dirname, "../../", "template/addons/trpc");

  const appSrc = path.join(trpcAssetDir, "_app.tsx");
  const appDest = path.join(projectDir, "src/pages/_app.tsx");

  const apiHandlerSrc = path.join(trpcAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");

  const utilsSrc = path.join(trpcAssetDir, "utils.ts");
  const utilsDest = path.join(projectDir, "src/utils/trpc.ts");

  const contextSrc = path.join(trpcAssetDir, "base-context.ts");
  const contextDest = path.join(projectDir, "src/server/router/context.ts");

  const routerSrc = path.join(trpcAssetDir, "index-router.ts");
  const routerDest = path.join(projectDir, "src/server/router/index.ts");

  const exampleRouterSrc = path.join(trpcAssetDir, "example-router.ts");
  const exampleRouterDest = path.join(
    projectDir,
    "src/server/router/example.ts"
  );

  await Promise.all([
    fs.copy(appSrc, appDest),
    fs.copy(apiHandlerSrc, apiHandlerDest),
    fs.copy(utilsSrc, utilsDest),
    fs.copy(contextSrc, contextDest),
    fs.copy(routerSrc, routerDest),
    fs.copy(exampleRouterSrc, exampleRouterDest),
  ]);
};
