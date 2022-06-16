import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import getPkgManager from "./getPkgManager";
import { logger } from "./logger";

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

  logger.info(`Using: ${chalk.cyan.bold(pkgManager)}`);

  if (fs.existsSync(projectDir)) {
    logger.error(`${chalk.redBright.bold(projectName)} already exists.`);
    process.exit(1);
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
    logger.info(`  ${pkgManager} prisma db push`);
  }

  if (pkgManager !== "npm") {
    logger.info(`  ${pkgManager} dev`);
  } else {
    logger.info("  npm run dev");
  }
};

export default createProject;
