import { execSync } from "child_process";
import ora from "ora";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

export const installDependencies = (projectDir: string) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const command = `${pkgManager} install`;
  const spinner = ora(`Running ${command}...\n`).start();

  execSync(command, { cwd: projectDir });

  spinner.succeed("Successfully installed dependencies!\n");
};
