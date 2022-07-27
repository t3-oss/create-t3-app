import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import {
  dependencyVersionMap,
  AvailableDependencies,
} from "~/installers/index.js";

export const addPackageDependency = (opts: {
  dependencies: AvailableDependencies[];
  devMode: boolean;
  projectDir: string;
}) => {
  const { dependencies, devMode, projectDir } = opts;

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json"),
  ) as PackageJson;

  dependencies.forEach((pkgName) => {
    const version = dependencyVersionMap[pkgName];

    if (devMode) {
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pkgJson.devDependencies![pkgName] = version;
    } else {
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pkgJson.dependencies![pkgName] = version;
    }
  });

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });
};
