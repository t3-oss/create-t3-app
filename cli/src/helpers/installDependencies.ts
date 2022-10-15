import ora from "ora";
import { execa } from "execa";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

export const installDependencies = async (projectDir: string) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const command = `${pkgManager} install`;
  const spinner = ora(`Running ${command}...\n`).start();

  await execa(command, { cwd: projectDir });

  spinner.succeed("Successfully installed dependencies!\n");
};
