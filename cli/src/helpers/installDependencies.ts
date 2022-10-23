import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

export const installDependencies = async (projectDir: string) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const spinner = ora(`Running ${pkgManager} install...\n`).start();

  // FIXME: temp fix for next-auth with node 18
  // see: https://github.com/nextauthjs/next-auth/issues/4575
  if (
    process.versions.node.startsWith("18") ||
    process.versions.node.startsWith("19")
  ) {
    if (pkgManager === "yarn") {
      await execa(pkgManager, ["add", "--ignore-engines", "true"], {
        cwd: projectDir,
      });
    } else {
      await execa(pkgManager, ["install", "--engine-strict", "false"], {
        cwd: projectDir,
      });
    }
  } else {
    await execa(pkgManager, ["install"], { cwd: projectDir });
  }

  spinner.succeed(chalk.green("Successfully installed dependencies!\n"));
};
