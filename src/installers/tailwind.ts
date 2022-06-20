import { installPkgs } from "../helpers/getPkgManager";
import type { Installer } from "../index";
import fs from "fs-extra";
import path from "path";

export const tailwindInstaller: Installer = async (projectDir, pkgManager) => {
  await installPkgs(pkgManager, true, projectDir, [
    "tailwindcss",
    "postcss",
    "autoprefixer",
  ]);

  const twAssetDir = path.join(__dirname, "../../", "template/addons/tailwind");

  const twCfgSrc = path.join(twAssetDir, "tailwind.config.js");
  const twCfgDest = path.join(projectDir, "tailwind.config.js");

  const postcssSrc = path.join(twAssetDir, "postcss.config.js");
  const postcssDest = path.join(projectDir, "postcss.config.js");

  const cssSrc = path.join(twAssetDir, "globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");

  await Promise.all([
    fs.copy(twCfgSrc, twCfgDest),
    fs.copy(postcssSrc, postcssDest),
    fs.copy(cssSrc, cssDest),
  ]);
};
