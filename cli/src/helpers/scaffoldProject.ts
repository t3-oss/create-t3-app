import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora, { Ora } from "ora";
import { logger } from "~/utils/logger.js";
import { cloneScaffoldAndReturnPath } from "~/utils/git.js";
import { PackageManager } from "~/utils/getUserPkgManager.js";
import { CliFlags } from "~/cli/index.js";

type ScaffoldProjectOptions = {
  projectName: string;
  projectDir: string;
  pkgManager: PackageManager;
  flags: CliFlags;
};

// This bootstraps the base Next.js application
export const scaffoldProject = async ({
  projectName,
  projectDir,
  pkgManager,
  flags,
}: ScaffoldProjectOptions) => {
  if (!flags.noInstall) {
    logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);
  } else {
    logger.info("");
  }

  const spinner = ora(`Scaffolding in: '${projectDir}'...\n`).start();

  await assertProjectDirIsntDirty(projectName, projectDir, spinner);
  await cloneScaffoldAndReturnPath(projectName);

  spinner.succeed(`${chalk.cyan.bold(projectName)} scaffolded successfully!\n`);
};

const assertProjectDirIsntDirty = async (
  projectName: string,
  projectDir: string,
  spinner: Ora,
) => {
  if (!fs.existsSync(projectDir)) return;

  if (fs.readdirSync(projectDir).length === 0) {
    spinner.info(
      `${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`,
    );

    return;
  }

  spinner.stopAndPersist();

  const overwriteDir = await promptClean(projectName);

  if (overwriteDir === "abort" || !(await promptConfirmClean())) {
    spinner.fail("Aborting installation...");
    process.exit(0);
  }

  spinner.info(
    `Emptying ${chalk.cyan.bold(projectName)} and creating t3 app..\n`,
  );
  fs.emptyDirSync(projectDir);
};

const promptClean = async (projectName: string) => {
  const { clean } = await inquirer.prompt<{
    clean: "abort" | "clear";
  }>({
    name: "clean",
    type: "list",
    message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(
      projectName,
    )} already exists and isn't empty. How would you like to proceed?`,
    choices: [
      {
        name: "Abort installation (recommended)",
        value: "abort",
        short: "Abort",
      },
      {
        name: "Clear the directory and continue installation",
        value: "clear",
        short: "Clear",
      },
    ],
    default: "abort",
  });

  return clean;
};

const promptConfirmClean = async (): Promise<boolean> => {
  const { confirmOverwriteDir } = await inquirer.prompt<{
    confirmOverwriteDir: boolean;
  }>({
    name: "confirmOverwriteDir",
    type: "confirm",
    message: `Are you sure you want to clear the directory?`,
    default: false,
  });

  return confirmOverwriteDir;
};
