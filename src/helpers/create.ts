import type { Packages } from "../index";
import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import prompts from "prompts";
import { execa } from "./execa";
import { getPkgManager, type PackageManager } from "./get-pkg-manager";
import { logger } from "./logger";
import { selectAppFile, selectIndexFile } from "./select-boilerplate";

export const createProject = async (
  projectName: string,
  packages: Packages,
) => {
  const pkgManager = getPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject(projectName, projectDir, pkgManager);

  // Install the selected packages
  await installPackages(projectDir, pkgManager, packages);

  // FIXME: Perhaps do this more dynamically. Adjust the _app and index based on packages
  await selectAppFile(projectDir, packages);
  await selectIndexFile(projectDir, packages);

  return projectDir;
};

// This bootstraps the base Next.js application
const scaffoldProject = async (
  projectName: string,
  projectDir: string,
  pkgManager: PackageManager,
) => {
  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}\n`);
  const spinner = ora(`Scaffolding in: ${projectDir}...\n`);
  spinner.color = "blue";
  spinner.start();

  const srcDir = path.join(__dirname, "../", "template/base");

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      logger.info(
        `${chalk.bold.green(projectName)} exists but is empty, continuing..\n`,
      );
    } else {
      const overwrite = await prompts({
        name: "overwriteDir",
        type: "toggle",
        message: `${chalk.redBright.bold(
          projectName,
        )} already exists and isn't empty, do you want to overwrite it?`,
        initial: false,
        active: "Yes",
        inactive: "No",
      });
      if (!overwrite.overwriteDir) {
        process.exit(0);
      } else {
        logger.info(
          `Emptying ${chalk.bold.green(projectName)} and creating t3 app..\n`,
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

// This installs all the packages that the user has selected
const installPackages = async (
  projectDir: string,
  pkgManager: PackageManager,
  packages: Packages,
) => {
  logger.info("Installing packages...");

  for (const [name, opts] of Object.entries(packages)) {
    if (opts.inUse) {
      const spinner = ora(`Installing ${name}...`).start();
      await opts.installer(projectDir, pkgManager, packages);
      spinner.stop();
      logger.success(`  Successfully installed ${name}.`);
    }
  }
  logger.info("");
};
