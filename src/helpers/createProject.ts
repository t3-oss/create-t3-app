import type { PkgInstallerMap } from "../installers/index.js";
import path from "path";
import { getUserPkgManager } from "../utils/getUserPkgManager.js";
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

  // Bootstraps the base Next.js application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    noInstall,
  });

  // Install the selected packages
  installPackages({
    projectDir,
    pkgManager,
    packages,
    noInstall,
  });

  // TODO: Look into using handlebars or other templating engine to scaffold without needing to maintain multiple copies of the same file
  selectAppFile({ projectDir, packages });
  selectIndexFile({ projectDir, packages });

  return projectDir;
};
