import type { PkgInstallerMap } from "../installers/index.js";
import type { PackageManager } from "../utils/getUserPkgManager.js";
import chalk from "chalk";
import ora from "ora";
import { logger } from "../utils/logger.js";

// This runs the installer for all the packages that the user has selected
export const installPackages = async (opts: {
  projectDir: string;
  pkgManager: PackageManager;
  packages: PkgInstallerMap;
  noInstall: boolean;
}) => {
  const { projectDir, pkgManager, packages, noInstall } = opts;

  logger.info(`${noInstall ? "Adding" : "Installing"} packages...`);

  for (const [name, pkgOpts] of Object.entries(packages)) {
    if (pkgOpts.inUse) {
      const spinner = ora(
        `${noInstall ? "Adding" : "Installing"} ${name}...`,
      ).start();
      await pkgOpts.installer({ projectDir, pkgManager, packages, noInstall });
      spinner.succeed(
        chalk.green(
          `Successfully ${noInstall ? "added" : "installed"} ${chalk.green.bold(
            name,
          )}`,
        ),
      );
    }
  }
  logger.info("");
};
