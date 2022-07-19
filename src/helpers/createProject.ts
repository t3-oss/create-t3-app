import type { PkgInstallerMap } from "../installers/index.js";
import path from "path";
import { getUserPkgManager } from "../utils/getUserPkgManager.js";
import { curryRunPkgManagerInstall } from "../utils/runPkgManagerInstall.js";
import { installPackages } from "./installPackages.js";
import { scaffoldProject } from "./scaffoldProject.js";
import { selectAppFile, selectIndexFile } from "./selectBoilerplate.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  noInstall: boolean;
}

export const createProject = async ({
  projectName,
  packages,
  noInstall,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);
  const runPkgManagerInstall = curryRunPkgManagerInstall({
    projectDir,
    pkgManager,
    devMode: false,
    noInstallMode: noInstall,
  });

  // Bootstraps the base Next.js application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    noInstall,
    runPkgManagerInstall,
  });

  // Install the selected packages
  await installPackages({
    projectDir,
    pkgManager,
    packages,
    noInstall,
    runPkgManagerInstall,
  });

  // TODO: Look into using handlebars or other templating engine to scaffold without needing to maintain multiple copies of the same file
  await selectAppFile({ projectDir, packages });
  await selectIndexFile({ projectDir, packages });

  return projectDir;
};
