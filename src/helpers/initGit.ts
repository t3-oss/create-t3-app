import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import { execa } from "../utils/execAsync.js";
import { logger } from "../utils/logger.js";

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  logger.info("Initializing Git...");
  const spinner = ora("Creating a new git repo...\n").start();
  try {
    await execa("git init --initial-branch=main", { cwd: projectDir });
    spinner.succeed(
      `${chalk.green("Successfully initialized")} ${chalk.green.bold("git")}\n`,
    );
  } catch (error) {
    spinner.fail(
      `${chalk.bold.red(
        "Failed:",
      )} could not initialize git. Update git to the latest version!\n`,
    );
  }

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore"),
  );
};
