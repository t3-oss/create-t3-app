import type { PkgInstallerMap } from "../installers/index.js";
import path from "path";
import { getUserPkgManager } from "../utils/getUserPkgManager.js";
import { installPackages } from "./installPackages.js";
import { scaffoldProject } from "./scaffoldProject.js";
import { selectAppFile, selectIndexFile } from "./selectBoilerplate.js";

export const createProject = async (opts: {
  projectName: string;
  packages: PkgInstallerMap;
  noInstall: boolean;
}) => {
  const { projectName, packages, noInstall } = opts;

  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject({ projectName, projectDir, pkgManager, noInstall });

  // Install the selected packages
  await installPackages({ projectDir, pkgManager, packages, noInstall });

  // TODO: Look into using handlebars or other templating engine to scaffold without needing to maintain multiple copies of the same file
  await selectAppFile(projectDir, packages);
  await selectIndexFile(projectDir, packages);

  return projectDir;
};
