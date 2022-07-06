import type { PkgInstallerMap } from "../installers/index.js";
import { getUserPkgManager } from "../utils/getUserPkgManager.js";
import { logger } from "../utils/logger.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = (opts: {
  projectName: string;
  packages: PkgInstallerMap;
  noInstall: boolean;
}) => {
  const { projectName, packages, noInstall } = opts;

  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  logger.info(`  cd ${projectName}`);
  if (!noInstall) {
    logger.info(`  ${pkgManager} install`);
  }

  if (packages.prisma.inUse) {
    logger.info(
      `  ${pkgManager === "npm" ? "npx" : pkgManager} prisma db push`,
    );
  }

  logger.info(`  ${pkgManager === "npm" ? "npm run" : pkgManager} dev`);
};
