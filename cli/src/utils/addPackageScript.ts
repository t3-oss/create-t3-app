import fs from "fs-extra";
import path from "path";
import sortPackageJson from "sort-package-json";
import { type PackageJson } from "type-fest";

export const addPackageScript = (opts: {
  scripts: { name: string; value: string }[];
  projectDir: string;
}) => {
  const pkgJson = fs.readJSONSync(
    path.join(opts.projectDir, "package.json"),
  ) as PackageJson;

  if (!pkgJson.scripts) {
    pkgJson.scripts = {};
  }

  for (const script of opts.scripts) {
    pkgJson.scripts[script.name] = script.value;
  }
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(opts.projectDir, "package.json"), sortedPkgJson, {
    spaces: 2,
  });
};
