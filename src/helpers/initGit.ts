import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import { execa } from "../utils/execAsync";
import { logger } from "../utils/logger";

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  const spinner = ora("Initializing Git...\n");
  spinner.color = "blue";
  spinner.start();
  try {
    await execa("git init", { cwd: projectDir });
    logger.success(`${chalk.bold.green("Finished")} initializing git\n`);
  } catch (error) {
    logger.error(`${chalk.bold.red("Failed: ")} could not initialize git\n`);
  }
  spinner.stop();

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore"),
  );
};
