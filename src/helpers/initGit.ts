import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import { execa } from "../utils/execAsync";

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  const spinner = ora("Initializing Git...\n").start();
  try {
    await execa("git init", { cwd: projectDir });
    spinner.succeed(`${chalk.bold.green("Finished")} initializing git\n`);
  } catch (error) {
    spinner.fail(`${chalk.bold.red("Failed: ")} could not initialize git\n`);
  }

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore"),
  );
};
