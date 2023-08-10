import path from "path";
import { PKG_ROOT } from "~/consts.js";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

export const getVersion = () => {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;

  return packageJsonContent.version ?? "1.0.0";
};
