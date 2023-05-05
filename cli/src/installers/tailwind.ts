import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const tailwindInstaller: Installer = ({ projectDir, packages }) => {
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

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const twCfgSrc = path.join(extrasDir, "config/tailwind.config.ts");
  const twCfgDest = path.join(projectDir, "tailwind.config.ts");

  const postcssCfgSrc = path.join(extrasDir, "config/postcss.config.cjs");
  const postcssCfgDest = path.join(projectDir, "postcss.config.cjs");

  const prettierSrc = path.join(
    extrasDir,
    "config/prettier-with-tailwind.config.cjs",
  );
  const prettierDest = path.join(projectDir, "prettier.config.cjs");

  const cssSrc = path.join(extrasDir, "src/styles/globals.css");
  const cssDest = path.join(projectDir, "src/styles/globals.css");

  fs.copySync(twCfgSrc, twCfgDest);
  fs.copySync(postcssCfgSrc, postcssCfgDest);
  fs.copySync(cssSrc, cssDest);

  // Let strictEslintAndPrettier install the prettier config
  if (!packages?.strictEslintAndPrettier.inUse) {
    fs.copySync(prettierSrc, prettierDest);
  }

  // Remove vanilla css file
  const indexModuleCss = path.join(projectDir, "src/pages/index.module.css");
  fs.unlinkSync(indexModuleCss);
};
