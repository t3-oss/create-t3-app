import { installPkgs } from "../helpers/get-pkg-manager";
import { type Installer } from "./index";
import fs from "fs-extra";
import path from "path";

export const tailwindInstaller: Installer = async (
  projectDir,
  packageManager,
  _packages
) => {
  await installPkgs({
    packageManager,
    projectDir,
    packages: ["tailwindcss", "postcss", "autoprefixer"],
    devMode: true,
  });

  const twAssetDir = path.join(__dirname, "../../", "template/addons/tailwind");

  const twCfgSrc = path.join(twAssetDir, "tailwind.config.js");
  const twCfgDest = path.join(projectDir, "tailwind.config.js");

  const postcssCfgSrc = path.join(twAssetDir, "postcss.config.js");
  const postcssCfgDest = path.join(projectDir, "postcss.config.js");

  const cssSrc = path.join(twAssetDir, "globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");

  await Promise.all([
    fs.copy(twCfgSrc, twCfgDest),
    fs.copy(postcssCfgSrc, postcssCfgDest),
    fs.copy(cssSrc, cssDest),
  ]);
};
