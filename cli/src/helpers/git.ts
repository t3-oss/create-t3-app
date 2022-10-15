import chalk from "chalk";
import { execSync } from "child_process";
import { execa } from "execa";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";
import { logger } from "~/utils/logger.js";

const isGitInstalled = (dir: string): boolean => {
  try {
    execSync("git --version", { cwd: dir });
    return true;
  } catch (_e) {
    return false;
  }
};

/** If dir has `.git` => is the root of a git repo */
const isRootGitRepo = (dir: string): boolean => {
  return fs.existsSync(path.join(dir, ".git"));
};

/** If dir is inside a git worktree, meaning a parent directory has `.git` */
const isInsideGitRepo = (dir: string): boolean => {
  try {
    const stdout = execSync("git rev-parse --is-inside-work-tree", {
      cwd: dir,
    }).toString();
    return stdout.trim() === "true";
  } catch (_e) {
    return false;
  }
};

const getGitVersion = () => {
  const stdout = execSync("git --version").toString().trim();
  const gitVersionTag = stdout.split(" ")[2];
  const major = gitVersionTag?.split(".")[0];
  const minor = gitVersionTag?.split(".")[1];
  return { major: Number(major), minor: Number(minor) };
};

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  logger.info("Initializing Git...");

  if (!isGitInstalled(projectDir)) {
    logger.warn("Git is not installed. Skipping Git initialization.");
    return;
  }

  const spinner = ora("Creating a new git repo...\n").start();

  const isRoot = isRootGitRepo(projectDir);
  const isInside = isInsideGitRepo(projectDir);
  const dirName = path.parse(projectDir).name; // skip full path for logging

  if (isInside && isRoot) {
    // Dir is a root git repo
    spinner.stopAndPersist();
    const { overwriteGit } = await inquirer.prompt<{
      overwriteGit: boolean;
    }>({
      name: "overwriteGit",
      type: "confirm",
      message: `${chalk.redBright.bold(
        "Warning:",
      )} Git is already initialized in "${dirName}". Initializing a new git repository would delete the previous history. Would you like to continue anyways?`,
      default: false,
    });
    if (!overwriteGit) {
      spinner.info("Skipping Git initialization.");
      return;
    }
    // Deleting the .git folder
    fs.removeSync(path.join(projectDir, ".git"));
  } else if (isInside && !isRoot) {
    // Dir is inside a git worktree
    spinner.stopAndPersist();
    const { initializeChildGitRepo } = await inquirer.prompt<{
      initializeChildGitRepo: boolean;
    }>({
      name: "initializeChildGitRepo",
      type: "confirm",
      message: `${chalk.redBright.bold(
        "Warning:",
      )} "${dirName}" is already in a git worktree. Would you still like to initialize a new git repository in this directory?`,
      default: false,
    });
    if (!initializeChildGitRepo) {
      spinner.info("Skipping Git initialization.");
      return;
    }
  }

  // We're good to go, initializing the git repo
  try {
    // --initial-branch flag was added in git v2.28.0
    const { major, minor } = getGitVersion();
    if (major < 2 || minor < 28) {
      await execa("git", ["init"], { cwd: projectDir });
      await execa("git", ["branch", "-m", "main"], { cwd: projectDir });
    } else {
      await execa("git", ["init", "--initial-branch=main"], {
        cwd: projectDir,
      });
    }
    spinner.succeed(
      `${chalk.green("Successfully initialized")} ${chalk.green.bold("git")}\n`,
    );
  } catch (error) {
    // Safeguard, should be unreachable
    spinner.fail(
      `${chalk.bold.red(
        "Failed:",
      )} could not initialize git. Update git to the latest version!\n`,
    );
  }
};
