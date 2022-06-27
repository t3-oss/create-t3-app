import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { PKG_ROOT } from "../consts";
import { execa } from "../utils/execAsync";
import { type PackageManager } from "../utils/getUserPkgManager";
import { logger } from "../utils/logger";

// This bootstraps the base Next.js application
export const scaffoldProject = async (
  projectName: string,
  projectDir: string,
  pkgManager: PackageManager,
) => {
  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}\n`);
  const spinner = ora(`Scaffolding in: ${projectDir}...\n`);
  spinner.color = "blue";
  spinner.start();

  const srcDir = path.join(PKG_ROOT, "template/base");

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      logger.info(
        `${chalk.bold.green(projectName)} exists but is empty, continuing..\n`,
      );
    } else {
      const { overwriteDir } = await inquirer.prompt<{ overwriteDir: boolean }>(
        {
          name: "overwriteDir",
          type: "confirm",
          message: `${chalk.redBright.bold(
            projectName,
          )} already exists and isn't empty. Do you want to overwrite it?`,
          default: false,
        },
      );
      if (!overwriteDir) {
        logger.info("Aborting installation...");
        process.exit(0);
      } else {
        logger.info(
          `Emptying ${chalk.green.bold(projectName)} and creating t3 app..\n`,
        );
        fs.emptyDirSync(projectDir);
      }
    }
  }

  await fs.copy(srcDir, projectDir);

  await execa(`${pkgManager} install`, { cwd: projectDir });
  spinner.stop();
  logger.success(`${chalk.cyan.bold(projectName)} scaffolded successfully.\n`);
};
