import { DEFAULT_APP_NAME } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import { isInsideGitRepo, isRootGitRepo } from "./git.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
  projectName = DEFAULT_APP_NAME,
  packages,
  appRouter,
  noInstall,
  projectDir,
  databaseProvider,
}: Pick<
  InstallerOptions,
  | "projectName"
  | "packages"
  | "noInstall"
  | "projectDir"
  | "appRouter"
  | "databaseProvider"
>) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  projectName !== "." && logger.info(`  cd ${projectName}`);
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (pkgManager === "yarn") {
      logger.info(`  ${pkgManager}`);
    } else {
      logger.info(`  ${pkgManager} install`);
    }
  }

  if (["postgres", "mysql"].includes(databaseProvider)) {
    logger.info("  ./start-database.sh");
  }

  if (packages?.prisma.inUse || packages?.drizzle.inUse) {
    if (["npm", "bun"].includes(pkgManager)) {
      logger.info(`  ${pkgManager} run db:push`);
    } else {
      logger.info(`  ${pkgManager} db:push`);
    }
  }

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run dev`);
  } else {
    logger.info(`  ${pkgManager} dev`);
  }

  if (!(await isInsideGitRepo(projectDir)) && !isRootGitRepo(projectDir)) {
    logger.info(`  git init`);
  }
  logger.info(`  git commit -m "initial commit"`);

  if (appRouter) {
    logger.warn(
      `\nThank you for trying out the App Router option. If you encounter any issues, please open an issue!`
    );
  }

  if (packages?.drizzle.inUse) {
    logger.warn(
      `\nThank you for trying out the new Drizzle option. If you encounter any issues, please open an issue!`,
      `\nNote: We use the PlanetScale driver so that you can query your data in edge runtimes. If you want to use a different driver, you'll need to change it yourself.`
    );
  }
};
