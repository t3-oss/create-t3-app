import type { PkgInstallerMap } from "~/installers/index.js";
import path from "path";
import { cleanArtifacts, patchPackages } from "~/helpers/patchPackages.js";
import { scaffoldProject } from "~/helpers/scaffoldProject.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

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
  await patchPackages({
    projectDir,
    pkgManager,
    packages,
    noInstall,
  });

  await cleanArtifacts(projectDir);

  return projectDir;
};
