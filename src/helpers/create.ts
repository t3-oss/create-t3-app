import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import getPkgManager from "./getPkgManager";
import { logger } from "./logger";
import prompts from "prompts";

const execa = promisify(exec);

const createProject = async (
  projectName: string,
  usingPrisma: boolean,
  usingNextAuth: boolean
) => {
  const srcDir = path.join(
    __dirname,
    "../../",
    usingPrisma
      ? usingNextAuth
        ? "template-prisma-auth"
        : "template-prisma"
      : "template"
  );

  const projectDir = path.resolve(process.cwd(), projectName);

  const pkgManager = getPkgManager();

  logger.info(`Scaffolding in: ${projectDir}\n`)
  
  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}\n`);
  

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      logger.info(`${chalk.bold.green(projectName)} exists but is empty, continuing..\n`);
    } else {
      const overwrite = await prompts({
        name: "overwriteDir",
        type: "toggle",
        message: `${chalk.redBright.bold(projectName)} already exists, do you want to overwrite it?`,
        initial: false,
        active: "Yes",
        inactive: "No",
      });
      if (!overwrite.overwriteDir) {
        process.exit(0);
      } else {
        logger.info(`Emptying ${chalk.bold.green(projectName)} and creating t3 app..\n`);
        fs.emptyDirSync(projectDir);
      }
    }
  }

  await fs.copy(srcDir, projectDir);

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

  logger.success(`${chalk.cyan.bold(projectName)} created successfully.`);

  logger.info("Next steps:");
  logger.info(` cd ${chalk.cyan.bold(projectName)}`);
  logger.info(`  ${pkgManager} install`);

  if (usingPrisma) {
    if (pkgManager !== "npm") {
      logger.info(`  ${pkgManager} prisma db push`);
    }
    else {
      logger.info(`  npx prisma db push`);
    }

  }

  if (pkgManager !== "npm") {
    logger.info(`  ${pkgManager} dev`);
  } else {
    logger.info("  npm run dev");
  }
};

export default createProject;
