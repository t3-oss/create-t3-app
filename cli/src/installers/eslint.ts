import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { type Installer } from "./index.js";

export const eslint: Installer = ({ projectDir }) => {
  const configDir = path.join(PKG_ROOT, "template/extras/config");

  addPackageDependency({
    dependencies: ["eslint", "eslint-config-next"],
    devMode: true,
    projectDir,
  });

  fs.copySync(
    path.join(configDir, "_eslintrc.cjs"),
    path.join(projectDir, "eslintrc.cjs"),
  );
};
