import type { Installer } from "./index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "../consts.js";

export const tailwindInstaller: Installer = async ({
  projectDir,
  runPkgManagerInstall,
}) => {
  await runPkgManagerInstall({
    packages: ["tailwindcss", "postcss", "autoprefixer"],
    devMode: true,
  });

  const twAssetDir = path.join(PKG_ROOT, "template/addons/tailwind");

  const twCfgSrc = path.join(twAssetDir, "tailwind.config.js");
  const twCfgDest = path.join(projectDir, "tailwind.config.js");

  const postcssCfgSrc = path.join(twAssetDir, "postcss.config.js");
  const postcssCfgDest = path.join(projectDir, "postcss.config.js");

  const cssSrc = path.join(twAssetDir, "globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");

  fs.copySync(twCfgSrc, twCfgDest);
  fs.copySync(postcssCfgSrc, postcssCfgDest);
  fs.copySync(cssSrc, cssDest);
};
