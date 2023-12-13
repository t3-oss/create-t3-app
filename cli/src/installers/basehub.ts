import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { type Installer } from "./index.js";

export const basehubInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["basehub"],
    devMode: false,
  });

  // add postinstall script to package.json
  const packageJsonPath = path.join(projectDir, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    postinstall: "basehub",
  };
};
