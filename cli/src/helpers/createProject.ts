import path from "path";
import { installPackages } from "~/helpers/installPackages.js";
import { scaffoldProject } from "~/helpers/scaffoldProject.js";
import { selectAppFile, selectIndexFile } from "~/helpers/selectBoilerplate.js";
import { installExtendedEslint } from "~/installers/eslint.js";
import { type PkgInstallerMap } from "~/installers/index.js";
import { installPrettier } from "~/installers/prettier.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  noInstall: boolean;
  importAlias: string;
  prettierAndExtendedEslint: boolean;
}

export const createProject = async ({
  projectName,
  packages,
  noInstall,
  prettierAndExtendedEslint,
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

  if (prettierAndExtendedEslint) {
    const installArgs = {
      projectDir,
      pkgManager,
      noInstall,
    };
    installPrettier(installArgs);
    installExtendedEslint(installArgs);
  }

  // TODO: Look into using handlebars or other templating engine to scaffold without needing to maintain multiple copies of the same file
  selectAppFile({ projectDir, packages });
  selectIndexFile({ projectDir, packages });

  return projectDir;
};
