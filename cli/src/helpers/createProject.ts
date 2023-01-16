import type { PkgInstallerMap } from "~/installers/index.js";
import path from "path";
import { installPackages } from "~/helpers/installPackages.js";
import { scaffoldProject } from "~/helpers/scaffoldProject.js";
import { selectAppFile, selectIndexFile } from "~/helpers/selectBoilerplate.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { overrideConfigs } from "~/helpers/overrideConfigs.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  noInstall: boolean;
  twConfig?: string | undefined;
  tsConfig?: string | undefined;
}

export const createProject = async ({
  projectName,
  packages,
  noInstall,
  twConfig,
  tsConfig,
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

  // Overriding default configuration files with the selected boilerplate
  overrideConfigs({
    tsConfig,
    twConfig,
    projectDir,
    packages,
  });

  // TODO: Look into using handlebars or other templating engine to scaffold without needing to maintain multiple copies of the same file
  selectAppFile({ projectDir, packages });
  selectIndexFile({ projectDir, packages });

  return projectDir;
};
