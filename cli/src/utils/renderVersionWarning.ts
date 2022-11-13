import { execSync } from "child_process";
import { getVersion } from "./getT3Version.js";
import { logger } from "./logger.js";

export const getNpmVersion = () =>
  execSync("npm view create-t3-app version").toString().trim();

export const renderVersionWarning = (npmVersion: string) => {
  const currentVersion = getVersion();

  if (currentVersion.includes("beta")) {
    logger.warn("  You are using a beta version of create-t3-app.");
    logger.warn("  Please report any bugs you encounter.");
  } else if (currentVersion.includes("next")) {
    logger.warn(
      "  You are running create-t3-app with the @next tag which is no longer maintained.",
    );
    logger.warn("  Please run the CLI with @latest instead.");
  } else if (currentVersion !== npmVersion) {
    logger.warn("  You are using an outdated version of create-t3-app.");
    logger.warn(
      "  Your version:",
      currentVersion + ".",
      "Latest version in the npm registry:",
      npmVersion,
    );
    logger.warn("  Please run the CLI with @latest to get the latest updates.");
  }
  console.log("");
};
