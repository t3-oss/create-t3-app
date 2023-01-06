import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import {
  dependencyVersionMap,
  AvailableDependencies,
} from "~/installers/dependencyVersionMap";
import sortPackageJson from "sort-package-json";

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
    // If these disables are still here after TypeScript@5, file an issue.
    // See https://github.com/t3-oss/create-t3-app/pull/1036#discussion_r1060505136
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const version = dependencyVersionMap[pkgName];

    if (devMode) {
      pkgJson.devDependencies![pkgName] = version;
    } else {
      pkgJson.dependencies![pkgName] = version;
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, "package.json"), sortedPkgJson, {
    spaces: 2,
  });
};
