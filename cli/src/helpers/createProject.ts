import type { PkgInstallerMap } from "~/installers/index.js";
import path from "path";
import { cleanArtifacts, patchPackages } from "~/helpers/patchPackages.js";
import { scaffoldProject } from "~/helpers/scaffoldProject.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { CliFlags } from "~/cli/index.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  flags: CliFlags;
}

export const createProject = async ({
  projectName,
  packages,
  flags,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    flags,
  });

  // Install the selected packages
  await patchPackages({
    projectDir,
    pkgManager,
    packages,
    flags,
  });

  await cleanArtifacts(projectDir);

  return projectDir;
};
