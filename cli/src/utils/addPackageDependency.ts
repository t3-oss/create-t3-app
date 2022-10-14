import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import {
  getDependencyVersionMap,
  AvailableDependencies,
  dependencyVersionMap,
  TRPCVersion,
} from "~/installers/index.js";
import sortPackageJson from "sort-package-json";

export const addPackageDependency = (opts: {
  dependencies: AvailableDependencies[];
  devMode: boolean;
  projectDir: string;
  trpcVersion?: TRPCVersion;
}) => {
  const { dependencies, devMode, projectDir } = opts;

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json"),
  ) as PackageJson;

  dependencies.forEach((pkgName) => {
    // Only the tRPC Installer Itself Uses Those Dependencies, But Todo: Fix Typing
    const version = opts.trpcVersion
      ? getDependencyVersionMap(opts.trpcVersion)[pkgName]
      : dependencyVersionMap[pkgName as keyof typeof dependencyVersionMap];
    if (devMode) {
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pkgJson.devDependencies![pkgName] = version;
    } else {
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pkgJson.dependencies![pkgName] = version;
    }
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, "package.json"), sortedPkgJson, {
    spaces: 2,
  });
};
