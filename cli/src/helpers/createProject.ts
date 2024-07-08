import fs from "fs";
import path from "path";

import { PKG_ROOT } from "~/consts.js";
import { installPackages } from "~/helpers/installPackages.js";
import { scaffoldProject } from "~/helpers/scaffoldProject.js";
import {
  selectAppFile,
  selectIndexFile,
  selectLayoutFile,
  selectPageFile,
} from "~/helpers/selectBoilerplate.js";
import {
  type DatabaseProvider,
  type PkgInstallerMap,
} from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  srcDirectory: boolean;
  scopedAppName: string;
  noInstall: boolean;
  importAlias: string;
  appRouter: boolean;
  databaseProvider: DatabaseProvider;
}

export const createProject = async ({
  projectName,
  srcDirectory,
  scopedAppName,
  packages,
  noInstall,
  appRouter,
  databaseProvider,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    srcDirectory,
    scopedAppName,
    noInstall,
    appRouter,
    databaseProvider,
  });

  // Install the selected packages
  installPackages({
    projectName,
    scopedAppName,
    srcDirectory,
    projectDir,
    pkgManager,
    packages,
    noInstall,
    appRouter,
    databaseProvider,
  });

  // Select necessary _app,index / layout,page files
  if (appRouter) {
    // Replace next.config
    fs.copyFileSync(
      path.join(PKG_ROOT, "template/extras/config/next-config-appdir.js"),
      path.join(projectDir, "next.config.js")
    );

    selectLayoutFile({ projectDir, packages, srcDirectory });
    selectPageFile({ projectDir, packages, srcDirectory });
  } else {
    selectAppFile({ projectDir, packages, srcDirectory });
    selectIndexFile({ projectDir, packages, srcDirectory });
  }

  // If no tailwind, select use css modules
  if (!packages.tailwind.inUse) {
    const indexModuleCss = path.join(
      PKG_ROOT,
      "template/extras/src/index.module.css"
    );
    const indexModuleCssDest = path.join(
      projectDir,
      srcDirectory ? "src" : "",
      appRouter ? "app" : "pages",
      "index.module.css"
    );
    fs.copyFileSync(indexModuleCss, indexModuleCssDest);
  }

  if (!srcDirectory) {
    const tsconfigFile = path.join(projectDir, "tsconfig.json");
    const nextconfigFile = path.join(projectDir, "next.config.js");
    fs.writeFileSync(
      tsconfigFile,
      fs.readFileSync(tsconfigFile, "utf8").replace("./src/*", "./*")
    );
    fs.writeFileSync(
      nextconfigFile,
      fs
        .readFileSync(nextconfigFile, "utf8")
        .replace("./src/env.js", "./env.js")
    );
  }

  return projectDir;
};
