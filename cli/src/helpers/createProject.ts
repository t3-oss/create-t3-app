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
  scopedAppName: string;
  noInstall: boolean;
  importAlias: string;
  appRouter: boolean;
  databaseProvider: DatabaseProvider;
  ignoreBuildErrors: boolean;
}

const updateNextConfigWithIgnoreOptions = (projectDir: string) => {
  const nextConfigPath = path.join(projectDir, "next.config.js");
  
  if (!fs.existsSync(nextConfigPath)) {
    return;
  }

  let configContent = fs.readFileSync(nextConfigPath, "utf-8");
  
  // Find the config object and add the ignore options
  const configWithIgnores = configContent.replace(
    /const config = {([^}]*)};/,
    `const config = {$1  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },};`
  );

  fs.writeFileSync(nextConfigPath, configWithIgnores);
};

export const createProject = async ({
  projectName,
  scopedAppName,
  packages,
  noInstall,
  appRouter,
  databaseProvider,
  ignoreBuildErrors,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    scopedAppName,
    noInstall,
    appRouter,
    databaseProvider,
  });

  // Install the selected packages
  installPackages({
    projectName,
    scopedAppName,
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

    selectLayoutFile({ projectDir, packages });
    selectPageFile({ projectDir, packages });
  } else {
    selectAppFile({ projectDir, packages });
    selectIndexFile({ projectDir, packages });
  }

  // Add ignore build errors configuration if selected
  if (ignoreBuildErrors) {
    updateNextConfigWithIgnoreOptions(projectDir);
  }

  // If no tailwind, select use css modules
  if (!packages.tailwind.inUse) {
    const indexModuleCss = path.join(
      PKG_ROOT,
      "template/extras/src/index.module.css"
    );
    const indexModuleCssDest = path.join(
      projectDir,
      "src",
      appRouter ? "app" : "pages",
      "index.module.css"
    );
    fs.copyFileSync(indexModuleCss, indexModuleCssDest);
  }

  return projectDir;
};