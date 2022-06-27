import type { PkgInstallerMap } from "../installers";
import path from "path";
import { getUserPkgManager } from "../utils/getUserPkgManager";
import { installPackages } from "./installPackages";
import { scaffoldProject } from "./scaffoldProject";
import { selectAppFile, selectIndexFile } from "./selectBoilerplate";

export const createProject = async (
  projectName: string,
  packages: PkgInstallerMap,
) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject(projectName, projectDir, pkgManager);

  // Install the selected packages
  await installPackages(projectDir, pkgManager, packages);

  // TODO: Look into using handlebars or other templating engine to scaffold without needing to maintain multiple copies of the same file
  await selectAppFile(projectDir, packages);
  await selectIndexFile(projectDir, packages);

  return projectDir;
};
