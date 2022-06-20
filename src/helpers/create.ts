import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { getPkgManager, type PackageManager } from "./getPkgManager";
import { logger } from "./logger";
import type { Packages } from "../index";
import { execa } from "./execa";

import { selectAppFile, selectIndexFile } from "./select-boilerplate";

export const createProject = async (
  projectName: string,
  packages: Packages
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
  pkgManager: PackageManager
) => {
  logger.info(`Scaffolding in: ${projectDir}...`);
  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}\n`);

  const srcDir = path.join(__dirname, "../../", "template/base");

  if (fs.existsSync(projectDir)) {
    logger.error(`${chalk.redBright.bold(projectName)} already exists.`);
    process.exit(1);
  }

  await fs.copy(srcDir, projectDir);

  await execa(`${pkgManager} install`, { cwd: projectDir });
  logger.success(`${chalk.cyan.bold(projectName)} scaffolded successfully.\n`);
};

// This installs all the packages that the user has selected
const installPackages = async (
  projectDir: string,
  pkgManager: PackageManager,
  packages: Packages
) => {
  logger.info("Installing packages...");

  for (const [name, opts] of Object.entries(packages)) {
    if (opts.inUse) {
      logger.info(`  Installing ${name}...`);
      await opts.installer(projectDir, pkgManager, packages);
      logger.success(`  Successfully installed ${name}.`);
    }
  }
  logger.info("");
};
