import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import { execa } from "./execa";
import { logger } from "./logger";

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  logger.info("Initializing git...");

  try {
    await execa("git init", { cwd: projectDir });
    logger.success(`${chalk.bold.green("Finished")} initializing git\n`);
  } catch (error) {
    logger.error(`${chalk.bold.red("Failed: ")} could not initialize git\n`);
  }

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore"),
  );
};
