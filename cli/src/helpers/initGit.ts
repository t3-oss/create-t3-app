import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import { logger } from "~/utils/logger.js";

// This initializes the Git-repository for the project
export const initializeGit = (projectDir: string) => {
  logger.info("Initializing Git...");
  const spinner = ora("Creating a new git repo...\n").start();
  try {
    let initCmd = "git init --initial-branch=main";

    // --initial-branch flag was added in git v2.28.0
    const gitVersionOutput = execSync("git --version").toString(); // git version 2.32.0 ...
    const gitVersionTag = gitVersionOutput.split(" ")[2];
    const major = gitVersionTag?.split(".")[0];
    const minor = gitVersionTag?.split(".")[1];
    if (Number(major) < 2 || Number(minor) < 28) {
      initCmd = "git init && git branch -m main";
    }

    execSync(initCmd, { cwd: projectDir });
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
};
