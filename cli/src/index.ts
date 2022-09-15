#!/usr/bin/env node
import { runCli } from "~/cli/index.js";
import { createProject } from "~/helpers/createProject.js";
import { logNextSteps } from "~/helpers/logNextSteps.js";
import { buildPkgInstallerMap } from "~/installers/index.js";
import { logger } from "~/utils/logger.js";
import { parseNameAndPath } from "~/utils/parseNameAndPath.js";
import { renderTitle } from "~/utils/renderTitle.js";
import { installDependencies } from "./helpers/installDependencies.js";
import { finishSetup } from "~/helpers/finishSetup.js";
import { initializeGit, isGitInstalled } from "~/utils/git.js";

const main = async () => {
  renderTitle();

  if (!(await isGitInstalled())) {
    logger.error("Git is not installed. Please install Git and try again.");
    process.exit(127);
  }

  const { appName, packages, flags } = await runCli();

  const usePackages = buildPkgInstallerMap(packages);

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    packages: usePackages,
    flags,
  });

  if (!flags.noInstall) {
    installDependencies(projectDir);
  }

  if (!flags.noGit) {
    await initializeGit(projectDir);
  }

  logNextSteps({ projectName: appDir, flags });

  await finishSetup({
    projectDir,
    scopedAppName,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:",
    );
    console.log(err);
  }
  process.exit(1);
});
