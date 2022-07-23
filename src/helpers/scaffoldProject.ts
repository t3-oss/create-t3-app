import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { PKG_ROOT } from "../consts.js";
import { InstallerOptions } from "../installers/index.js";
import { execa } from "../utils/execAsync.js";
import { getAllFiles } from "../utils/getAllFiles.js";
import { logger } from "../utils/logger.js";

// This bootstraps the base Next.js application
export const scaffoldProject = async ({
  projectName,
  projectDir,
  pkgManager,
  noInstall,
}: InstallerOptions) => {
  const srcDir = path.join(PKG_ROOT, "template/base");

  if (!noInstall) {
    logger.info(`\nUsing: ${chalk.cyan.bold(pkgManager)}\n`);
  } else {
    logger.info("");
  }

  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  if (fs.existsSync(projectDir)) {
    const userFilesSet = new Set(getAllFiles(projectDir));
    const srcFiles = [...getAllFiles(srcDir), ".gitignore"]; // template files
    const conflictingFiles = srcFiles.filter((element) =>
      userFilesSet.has(element),
    );

    if (userFilesSet.size === 0) {
      spinner.info(
        `${chalk.cyan.bold(projectName)} exists but is empty, continuing...\n`,
      );
    } else if (conflictingFiles.length === 0) {
      spinner.info(
        `${chalk.cyan.bold(
          projectName,
        )} is not empty, but no conflicting files found, continuing...\n`,
      );
    } else {
      let conflictingFilesStr = "";
      for (const file of conflictingFiles) {
        conflictingFilesStr += `\n  ${chalk.cyan.bold(
          projectName,
        )}${chalk.reset.red(path.sep + file)}`;
      }

      spinner.stopAndPersist();
      const { overwriteDir } = await inquirer.prompt<{
        overwriteDir: "abort" | "clear" | "overwrite";
      }>({
        name: "overwriteDir",
        type: "list",
        message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(
          projectName,
        )} already exists and has conflicting files:\n${conflictingFilesStr}\n\n How would you like to proceed?`,
        choices: [
          { name: "Abort installation", value: "abort", short: "Abort" },
          { name: "Clear directory", value: "clear", short: "Clear" },
          {
            name: "Overwrite files (dangerous)",
            value: "overwrite",
            short: "Overwrite",
          },
        ],
        default: "abort",
      });
      if (overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(0);
      } else if (overwriteDir === "clear") {
        spinner.info(
          `Emptying ${chalk.cyan.bold(projectName)} and creating t3 app..\n`,
        );
        fs.emptyDirSync(projectDir);
      } else {
        spinner.info(
          `Overwriting conflicts in ${chalk.cyan.bold(
            projectName,
          )} and creating t3 app..\n`,
        );
      }
    }
  }

  spinner.start();

  await fs.copy(srcDir, projectDir);
  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore"),
  );

  if (!noInstall) {
    await execa(`${pkgManager} install`, { cwd: projectDir });
  }
  spinner.succeed(`${chalk.cyan.bold(projectName)} scaffolded successfully!\n`);
};
