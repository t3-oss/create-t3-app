import type { Installer } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const tailwindInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "tailwindcss",
      "postcss",
      "autoprefixer",
      "prettier",
      "prettier-plugin-tailwindcss",
      "@types/prettier",
    ],
    devMode: true,
  });

  const twAssetDir = path.join(PKG_ROOT, "template/addons/tailwind");

  const twCfgSrc = path.join(twAssetDir, "tailwind.config.cjs");
  const twCfgDest = path.join(projectDir, "tailwind.config.cjs");

  const postcssCfgSrc = path.join(twAssetDir, "postcss.config.cjs");
  const postcssCfgDest = path.join(projectDir, "postcss.config.cjs");

  const prettierSrc = path.join(twAssetDir, "prettier.config.cjs");
  const prettierDest = path.join(projectDir, "prettier.config.cjs");

  const cssSrc = path.join(twAssetDir, "globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");

  const indexModuleCss = path.join(projectDir, "src/pages/index.module.css");

  fs.copySync(twCfgSrc, twCfgDest);
  fs.copySync(postcssCfgSrc, postcssCfgDest);
  fs.copySync(cssSrc, cssDest);
  fs.unlinkSync(indexModuleCss);
  fs.copySync(prettierSrc, prettierDest);
};
