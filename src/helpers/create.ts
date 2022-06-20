import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import { getPkgManager, type PackageManager } from "./getPkgManager";
import { logger } from "./logger";

import { tailwindInstaller } from "../installers/tailwind";
import { trpcInstaller } from "../installers/trpc";
import { prismaInstaller } from "../installers/prisma";

const installers = {
  tailwind: tailwindInstaller,
  trpc: trpcInstaller,
  prisma: prismaInstaller,
};

const execa = promisify(exec);

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

const installPackages = async (
  projectDir: string,
  pkgManager: PackageManager,
  packages: string[]
) => {
  for (const [packageName, installer] of Object.entries(installers)) {
    if (packages.some((p) => p === packageName)) {
      logger.info(`  Installing ${packageName}...`);
      await installer(projectDir, pkgManager);
      logger.success(`  ${packageName} installed successfully.`);
    }
  }
};

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

const selectIndexPage = async (projectDir: string, packages: string[]) => {
  const indexFilesDir = path.join(
    __dirname,
    "../../",
    "template/index-examples"
  );

  const tw = packages.some((p) => p === "tailwind");
  const trpc = packages.some((p) => p === "trpc");

  let indexFile = "";
  if (tw && !trpc) {
    indexFile = path.join(indexFilesDir, "tailwind.tsx");
  } else if (!tw && trpc) {
    indexFile = path.join(indexFilesDir, "trpc.tsx");
  } else if (tw && trpc) {
    indexFile = path.join(indexFilesDir, "tailwind-trpc.tsx");
  }

  if (indexFile !== "") {
    const indexDest = path.join(projectDir, "src/pages/index.tsx");
    await fs.copy(indexFile, indexDest);
  }
};

const logNextSteps = (
  projectName: string,
  pkgManager: PackageManager,
  usingPrisma: boolean
) => {
  logger.info("Next steps:");
  logger.info(` cd ${chalk.cyan.bold(projectName)}`);

  if (usingPrisma) {
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

export const createProject = async (
  projectName: string,
  packages: string[]
) => {
  const pkgManager = getPkgManager();
  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}`);

  logger.info("Scaffolding project...");
  const projectDir = await scaffoldProject(projectName, pkgManager);

  logger.info("Installing packages...");
  await installPackages(projectDir, pkgManager, packages);

  // FIXME: Perhaps do this more dynamically
  await selectIndexPage(projectDir, packages);

  logger.info("Initializing git...");
  await initializeGit(projectDir);

  const usingPrisma = packages.some((p) => p === "prisma");
  logNextSteps(projectName, pkgManager, usingPrisma);
};
