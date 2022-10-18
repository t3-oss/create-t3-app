import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

export const installDependencies = async (projectDir: string) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const spinner = ora(`Running ${pkgManager} install...\n`).start();

  await execa(pkgManager, ["install"], { cwd: projectDir });

  spinner.succeed(chalk.green("Successfully installed dependencies!\n"));
};
