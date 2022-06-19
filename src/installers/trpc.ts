import { installPkgs, type PackageManager } from "../helpers/getPkgManager";
import fs from "fs-extra";
import path from "path";

export const trpcInstaller = async (
  projectDir: string,
  pkgManager: PackageManager
) => {
  await installPkgs(pkgManager, false, projectDir, [
    "@trpc/server",
    "@trpc/client",
    "@trpc/next",
    "@trpc/react",
    "superjson",
    "zod",
  ]);

  const trpcAssetDir = path.join(__dirname, "../../", "template/addons/trpc");

  const appFile = path.join(trpcAssetDir, "_app.tsx");
  const appDest = path.join(projectDir, "src/pages/_app.tsx");
  await fs.copy(appFile, appDest);

  const apiHandlerFile = path.join(trpcAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(projectDir, "src/pages/api/trpc/[trpc].ts");
  await fs.copy(apiHandlerFile, apiHandlerDest);

  const utilsFile = path.join(trpcAssetDir, "utils.ts");
  const utilsDest = path.join(projectDir, "src/utils/trpc.ts");
  await fs.copy(utilsFile, utilsDest);
};
