import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

import { logger } from "./logger";
import { execa } from "./execa";

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  logger.info("Initializing git...");

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
