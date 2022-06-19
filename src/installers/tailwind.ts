import { installPkgs, type PackageManager } from "../helpers/getPkgManager";
import fs from "fs-extra";
import path from "path";

export const tailwindInstaller = async (
  projectDir: string,
  pkgManager: PackageManager
) => {
  await installPkgs(pkgManager, true, projectDir, [
    "tailwindcss",
    "postcss",
    "autoprefixer",
  ]);

  const twAssetDir = path.join(__dirname, "../../", "template/addons/tailwind");

  const twConfig = path.join(twAssetDir, "tailwind.config.js");
  const twDest = path.join(projectDir, "tailwind.config.js");
  await fs.copy(twConfig, twDest);

  const postcssConfig = path.join(twAssetDir, "postcss.config.js");
  const postcssDest = path.join(projectDir, "postcss.config.js");
  await fs.copy(postcssConfig, postcssDest);

  const cssFile = path.join(twAssetDir, "globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");
  await fs.copy(cssFile, cssDest);

  const indexFile = path.join(twAssetDir, "../page-examples", "tailwind.tsx");
  const indexDest = path.join(projectDir, "src/pages/index.tsx");
  await fs.copy(indexFile, indexDest);
};
