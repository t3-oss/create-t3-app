import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "./index.js";

export const eslint: Installer = ({ projectDir, packages }) => {
  const configDir = path.join(PKG_ROOT, "template/extras/config");

  fs.rmSync(path.join(projectDir, "_eslintrc.cjs"));

  fs.copySync(
    path.join(configDir, "_prettier.config.cjs"),
    path.join(projectDir, "prettier.config.cjs"),
  );
};
