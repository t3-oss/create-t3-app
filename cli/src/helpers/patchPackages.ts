import type { InstallerOptions, PkgInstallerMap } from "~/installers/index.js";
import chalk from "chalk";
import ora from "ora";
import { logger } from "~/utils/logger.js";
import fs from "fs-extra";

type InstallPackagesOptions = {
  packages: PkgInstallerMap;
} & InstallerOptions;
// This runs the installer for all the packages that the user has selected
export const patchPackages = async (options: InstallPackagesOptions) => {
  const { packages } = options;
  logger.info("Adding boilerplate...");

  for (const [name, pkgOpts] of Object.entries(packages)) {
    if (pkgOpts.inUse) {
      const spinner = ora(`Boilerplating ${name}...`).start();
      await pkgOpts.installer(options);
      spinner.succeed(
        chalk.green(
          `Successfully setup boilerplate for ${chalk.green.bold(name)}`,
        ),
      );
    }
  }

  logger.info("");
};

export const cleanArtifacts = async (projectDir: string) => {
  const spinner = ora(`Cleaning artifacts...`).start();

  await fs.remove(`${projectDir}/patches`);
  await fs.remove(`${projectDir}/.git`);

  spinner.succeed(`Successfully cleaned artifacts`);
};
