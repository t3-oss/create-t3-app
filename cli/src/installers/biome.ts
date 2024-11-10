import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const biomeInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["@biomejs/biome"],
    devMode: true,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");
  const biomeConfigSrc = path.join(extrasDir, "config/biome.jsonc");
  const biomeConfigDest = path.join(projectDir, "biome.jsonc");

  fs.copySync(biomeConfigSrc, biomeConfigDest);

  // add format:* scripts to package.json
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    "format:write": 'biome format --write "**/*.{ts,tsx,js,jsx,mdx}"',
    "format:check": 'biome format --check "**/*.{ts,tsx,js,jsx,mdx}"',
  };

  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
