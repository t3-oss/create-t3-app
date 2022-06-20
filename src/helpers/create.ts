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
  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}`);

  logger.info("Scaffolding project...");
  const projectDir = await scaffoldProject(projectName, pkgManager);

  logger.info("Installing packages...");
  await installPackages(projectDir, pkgManager, packages);

  // FIXME: Perhaps do this more dynamically
  await selectAppFile(projectDir, packages);
  await selectIndexFile(projectDir, packages);

  logger.info("Initializing git...");
  await initializeGit(projectDir);

  logNextSteps(projectName, pkgManager, packages);
};

// This bootstraps the base Next.js application
const scaffoldProject = async (
  projectName: string,
  pkgManager: PackageManager
) => {
  const srcDir = path.join(__dirname, "../../", "template/base");
  const projectDir = path.resolve(process.cwd(), projectName);

  logger.info(`Scaffolding in: ${projectDir}\n`);

  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}\n`);

  if (fs.existsSync(projectDir)) {
    logger.error(`${chalk.redBright.bold(projectName)} already exists.`);
    process.exit(1);
  }

  await fs.copy(srcDir, projectDir);

  await execa(`${pkgManager} install`, { cwd: projectDir });
  logger.success(`${chalk.cyan.bold(projectName)} scaffolded successfully.`);

  return projectDir;
};

// This installs all the packages that the user has selected
const installPackages = async (
  projectDir: string,
  pkgManager: PackageManager,
  packages: Packages
) => {
  for (const [name, opts] of Object.entries(packages)) {
    if (opts.inUse) {
      logger.info(`Installing ${name}...`);
      await opts.installer(projectDir, pkgManager, packages);
      logger.success(`Successfully installed ${name}.`);
    }
  }
};

// This initializes the Git-repository for the project
const initializeGit = async (projectDir: string) => {
  try {
    await execa("git init", { cwd: projectDir });
    logger.success(`${chalk.bold.green("Finished")} initializing git`);
  } catch (error) {
    logger.error(`${chalk.bold.red("Failed: ")} could not initialize git`);
  }

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );
};

// This logs the next steps that the user should take in order to advance the project
const logNextSteps = (
  projectName: string,
  pkgManager: PackageManager,
  packages: Packages
) => {
  logger.info("Next steps:");
  logger.info(` cd ${chalk.cyan.bold(projectName)}`);

  if (packages.prisma.inUse) {
    if (pkgManager !== "npm") {
      logger.info(`  ${pkgManager} prisma db push`);
    } else {
      logger.info(`  npx prisma db push`);
    }
  }

  if (pkgManager !== "npm") {
    logger.info(`  ${pkgManager} dev`);
  } else {
    logger.info("  npm run dev");
  }
};
