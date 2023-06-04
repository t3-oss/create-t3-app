import { DEFAULT_APP_NAME } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = ({
  projectName = DEFAULT_APP_NAME,
  packages,
  noInstall,
}: Pick<InstallerOptions, "projectName" | "packages" | "noInstall">) => {
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

  if (packages?.prisma.inUse) {
    logger.info(`  ${pkgManager === "npm" ? "npm run" : pkgManager} db:push`);
  }

  logger.info(`  ${pkgManager === "npm" ? "npm run" : pkgManager} dev`);

  logger.warn(
    `\nThank you for trying out the new Drizzle option. If you encounter any issues, please open an issue!`,
    `\nNote: We use the PlanetScale driver. If you want to use a different driver, you'll need to change it yourself.`,
  );
};
