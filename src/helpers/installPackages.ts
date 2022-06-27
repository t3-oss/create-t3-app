import type { PkgInstallerMap } from "../installers/index.js";
import type { PackageManager } from "../utils/getUserPkgManager.js";
import chalk from "chalk";
import ora from "ora";
import { logger } from "../utils/logger.js";

// This runs the installer for all the packages that the user has selected
export const installPackages = async (
  projectDir: string,
  pkgManager: PackageManager,
  packages: PkgInstallerMap,
) => {
  logger.info("Installing packages...");

  for (const [name, opts] of Object.entries(packages)) {
    if (opts.inUse) {
      const spinner = ora(`Installing ${name}...`).start();
      await opts.installer(projectDir, pkgManager, packages);
      spinner.succeed(
        chalk.green(`Successfully installed ${chalk.green.bold(name)}`),
      );
    }
  }
  logger.info("");
};
