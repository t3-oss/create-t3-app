#!/usr/bin/env node
import type { PackageJson } from "type-fest";
import path from "path";
import fs from "fs-extra";
import { runCli } from "./cli";
import { TITLE_TEXT } from "./consts";
import { createProject } from "./helpers/createProject";
import { initializeGit } from "./helpers/initGit";
import { logNextSteps } from "./helpers/logNextSteps";
import { installers, type Installer } from "./installers";
import { logger } from "./utils/logger";

export type AvailablePackages = "tailwind" | "trpc" | "prisma" | "nextAuth";
export type Packages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

const main = async () => {
  logger.error(TITLE_TEXT, "\n");

  const {
    appName,
    usePackages: { nextAuth, prisma, tailwind, trpc },
    flags,
  } = await runCli();

  const packages: Packages = {
    tailwind: { inUse: tailwind, installer: installers.tailwind },
    trpc: { inUse: trpc, installer: installers.trpc },
    prisma: { inUse: prisma, installer: installers.prisma },
    nextAuth: { inUse: nextAuth, installer: installers.nextAuth },
  };

  const projectDir = await createProject(appName, packages);

  if (!flags.noGit) {
    await initializeGit(projectDir);
  }

  logNextSteps(appName, packages);

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
