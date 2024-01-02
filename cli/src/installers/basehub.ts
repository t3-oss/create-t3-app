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
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;

  pkgJson.scripts = pkgJson.scripts || {};

  pkgJson.scripts.postinstall = "basehub";
  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });
};
