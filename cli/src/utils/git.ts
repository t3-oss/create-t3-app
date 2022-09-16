import { execa } from "execa";
import { TEMPLATE_URL } from "~/consts.js";
import { BranchNames } from "~/installers/index.js";
import { logger } from "~/utils/logger.js";
import fs from "fs-extra";
import { execSync } from "child_process";
import path from "path";
import ora, { Ora } from "ora";
import inquirer from "inquirer";
import chalk from "chalk";

export const cloneScaffoldAndReturnPath = async (
  projectName: string,
): Promise<void> => {
  // git clone {TEMPLATE_URL} {projectName}
  try {
    await execa("git", ["clone", TEMPLATE_URL, projectName]);
  } catch (error) {
    logger.warn(
      `  Error trying to clone the scaffold project. Can you run 'git clone ${TEMPLATE_URL}'?`,
    );
    logger.error(error);
  }
};

export const generatePatches = async (
  packageName: BranchNames,
  path: string,
): Promise<void> => {
  try {
    // git checkout pkg/{packageName}
    await execa("git", ["checkout", `pkg/${packageName}`], {
      cwd: path,
    });

    // git format-patch main -o patches -U1
    // Creates a patch file of every commit that is not in main
    // `-o patches` specifies the output directory (patches)
    // `-U1` specifies the number of lines of context to include in the patch (1)
    await execa("git", ["format-patch", "main", "-o", "patches", "-U1"], {
      cwd: path,
    });

    // git checkout main
    await execa("git", ["checkout", "main"], {
      cwd: path,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const applyPatch = async (projectDir: string, patchName: string) => {
  // git apply {projectDir}/patches/{patchName}
  // Applies the patch file at {projectDir}/patches/{patchName}
  try {
    await execa("git", ["am", `patches/${patchName}`], {
      cwd: projectDir,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const deletePatches = async (path: string) => {
  await fs.removeSync(`${path}/patches`);
};

export const isGitInstalled = async (dir = "."): Promise<boolean> => {
  try {
    await execa("git", ["--version"], {
      cwd: dir,
    });
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
const isInsideGitRepo = async (dir: string): Promise<boolean> => {
  try {
    const { stdout } = await execa(
      "git",
      ["rev-parse", "--is-inside-work-tree"],
      {
        cwd: dir,
      },
    );
    return stdout.trim() === "true";
  } catch (_e) {
    return false;
  }
};

// This initializes the Git-repository for the project
export const initializeGit = async (projectDir: string) => {
  logger.info("Initializing Git...");

  const spinner = ora("Creating a new git repo...\n").start();

  await assertGitInit(projectDir, spinner);

  // We're good to go, initializing the git repo
  try {
    let initCmd = "git init --initial-branch=main";
    // --initial-branch flag was added in git v2.28.0
    const gitVersionOutput = execSync("git --version").toString(); // git version 2.32.0 ...
    const gitVersionTag = gitVersionOutput.split(" ")[2]?.split(".");
    const major = gitVersionTag?.[0];
    const minor = gitVersionTag?.[1];

    if (major && minor && (parseInt(major) < 2 || parseInt(minor) < 28)) {
      initCmd = "git init && git branch -m main";
    }

    execSync(initCmd, { cwd: projectDir });
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

const assertGitInit = async (projectDir: string, spinner: Ora) => {
  const isRoot = isRootGitRepo(projectDir);
  const isInside = await isInsideGitRepo(projectDir);
  const dirName = path.parse(projectDir).name; // skip full path for logging
  if (isInside && isRoot) {
    // Dir is a root git repo
    spinner.stopAndPersist();
    if (!(await promptOverwriteGit(dirName))) {
      spinner.info("Skipping Git initialization.");
      return;
    }
    // Deleting the .git folder
    fs.removeSync(path.join(projectDir, ".git"));
  } else if (isInside && !isRoot) {
    // Dir is inside a git worktree
    spinner.stopAndPersist();
    if (!(await promptInitChildGitRepo(dirName))) {
      spinner.info("Skipping Git initialization.");
      return;
    }
  }
};

const promptOverwriteGit = async (dirName: string): Promise<boolean> => {
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
  return overwriteGit;
};

const promptInitChildGitRepo = async (dirName: string): Promise<boolean> => {
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

  return initializeChildGitRepo;
};
