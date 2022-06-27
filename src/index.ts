#!/usr/bin/env node
import type { PackageJson } from "type-fest";
import path from "path";
import fs from "fs-extra";
import { runCli } from "./cli";
import { TITLE_TEXT } from "./consts";
import { createProject } from "./helpers/createProject";
import { initializeGit } from "./helpers/initGit";
import { logNextSteps } from "./helpers/logNextSteps";
import { installers, Packages } from "./installers";
import { logger } from "./utils/logger";

const main = async () => {
  logger.error(TITLE_TEXT, "\n");

  const {
    appName,
    packages,
    flags: { noGit },
  } = await runCli();

  const usePackages: Packages = {
    nextAuth: {
      inUse: packages.includes("nextAuth"),
      installer: installers.nextAuth,
    },
    prisma: {
      inUse: packages.includes("prisma"),
      installer: installers.prisma,
    },
    tailwind: {
      inUse: packages.includes("tailwind"),
      installer: installers.tailwind,
    },
    trpc: {
      inUse: packages.includes("trpc"),
      installer: installers.trpc,
    },
  };

  const projectDir = await createProject(appName, usePackages);

  if (!noGit) {
    await initializeGit(projectDir);
  }

  logNextSteps(appName, usePackages);

  const pkgJson = (await fs.readJSON(
    path.join(projectDir, "package.json"),
  )) as PackageJson;
  pkgJson.name = appName;
  await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err.message);
  } else {
    logger.error(
      "An unkown error has occured. Please open an issue on github with the below:",
    );
    console.log(err);
  }
  process.exit(1);
});
