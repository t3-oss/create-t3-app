import type { PkgInstallerMap } from "../installers";
import { getUserPkgManager } from "../utils/getUserPkgManager";
import { logger } from "../utils/logger";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = (
  projectName: string,
  packages: PkgInstallerMap,
) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  logger.info(`  cd ${projectName}`);

  if (packages.prisma.inUse) {
    logger.info(
      `  ${pkgManager === "npm" ? "npx" : pkgManager} prisma db push`,
    );
  }

  logger.info(`  ${pkgManager === "npm" ? "npm run" : pkgManager} dev`);
};
