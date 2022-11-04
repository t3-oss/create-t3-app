import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

type Options = {
  projectDir: string;
};

export const installDependencies = async ({ projectDir }: Options) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const spinner =
    pkgManager === "yarn"
      ? ora(`Running ${pkgManager} add...\n`).start()
      : ora(`Running ${pkgManager} install...\n`).start();

    if (pkgManager === "yarn") {
      await execa(pkgManager, ["add"], { cwd: projectDir });
    } else {
      await execa(pkgManager, ["install"], { cwd: projectDir });
    }

  spinner.succeed(chalk.green("Successfully installed dependencies!\n"));
};
