import { DEFAULT_APP_NAME } from "~/consts.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import { CliFlags } from "~/cli/index.js";

type LogNextStepsOptions = {
  projectName: string;
  flags: CliFlags;
};

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = ({
  projectName = DEFAULT_APP_NAME,
  flags,
}: LogNextStepsOptions) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  logger.info(`  cd ${projectName}`);

  if (flags.noInstall) {
    logger.info(`  ${pkgManager} install`);
  }

  if (flags.prisma) {
    logger.info(
      `  ${pkgManager === "npm" ? "npx" : pkgManager} prisma db push`,
    );
  }

  logger.info(`  ${pkgManager === "npm" ? "npm run" : pkgManager} dev`);
};
