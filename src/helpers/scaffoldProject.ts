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
  const srcDir = path.join(PKG_ROOT, "template/base");

  logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);
  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      spinner.info(
        `${chalk.cyan.bold(projectName)} exists but is empty, continuing..\n`,
      );
    } else {
      spinner.stopAndPersist();
      const { overwriteDir } = await inquirer.prompt<{ overwriteDir: boolean }>(
        {
          name: "overwriteDir",
          type: "confirm",
          message: `${chalk.redBright.bold("!Warning:")} ${chalk.cyan.bold(
            projectName,
          )} already exists and isn't empty. Do you want to overwrite it?`,
          default: false,
        },
      );
      if (!overwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(0);
      } else {
        spinner.info(
          `Emptying ${chalk.cyan.bold(projectName)} and creating t3 app..\n`,
        );
        fs.emptyDirSync(projectDir);
      }
    }
  }

  spinner.start();
  await fs.copy(srcDir, projectDir);

  await execa(`${pkgManager} install`, { cwd: projectDir });

  spinner.succeed(`${chalk.cyan.bold(projectName)} scaffolded successfully.\n`);
};
