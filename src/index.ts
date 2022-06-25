#!/usr/bin/env node
import type { PackageJson } from "type-fest";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import prompts from "prompts";
import { createProject } from "./helpers/create";
import { getVersion } from "./helpers/getVersion";
import { initializeGit } from "./helpers/init-git";
import { logNextSteps } from "./helpers/log-next-steps";
import { logger } from "./helpers/logger";
import { installers, type Installer } from "./installers";

type AvailablePackages = "tailwind" | "trpc" | "prisma" | "nextAuth";
export type Packages = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

const DEFAULT_PROJECT_NAME = "my-t3-app";

const TITLE_TEXT = `Welcome to the create-t3-app !`;

const program = new Command().name("create-t3-app");

const main = async () => {
  logger.error(TITLE_TEXT, "\n");

  program
    .description("A CLI for creating web applications with the t3 stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new t3-app",
    )
    .version(getVersion(), "-v, --version", "Display the version number")
    .addHelpText(
      "afterAll",
      `\n The t3 stack was inspired by ${chalk
        .hex("#E8DCFF")
        .bold(
          "@t3dotgg",
        )} and has been used to build awesome fullstack applications like ${chalk
        .hex("#E24A8D")
        .underline("https://ping.gg")} \n`,
    )
    .parse(process.argv);

  const programOptions = program.opts<{
    noGit?: boolean;
    noInstall?: boolean;
    default?: boolean;
  }>();

  const cliProvidedName: string | undefined = program.args[0];

  //DEV
  console.log({
    cliProvidedName,
    programOptions,
  });

  // FIXME: Look into if the type can be inferred
  const { name, useTailwind, useTrpc, usePrisma, useNextAuth } = (await prompts(
    [
      {
        name: "name",
        type: !!cliProvidedName ? null : "text",
        message: "What will your project be called?",
        initial: DEFAULT_PROJECT_NAME,
        format: (input: string) => {
          return input.trim();
        },
      },
      {
        name: "language",
        type: "select",
        message: "Will you be using JavaScript or TypeScript?",
        instructions: false,
        choices: [
          {
            title: "TypeScript",
            value: "typescript",
          },
          {
            title: "JavaScript",
            value: "javascript",
          },
        ],
        format: (language: string) => {
          if (language === "javascript") {
            logger.error("Wrong answer, using TypeScript instead...");
          } else {
            logger.success("Good choice! Using TypeScript!");
          }
          return;
        },
      },
      {
        name: "useTailwind",
        type: "toggle",
        message: "Would you like to use Tailwind?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
      {
        name: "useTrpc",
        type: "toggle",
        message: "Would you like to use tRPC?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
      {
        name: "usePrisma",
        type: "toggle",
        message: "Would you like to use Prisma?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
      {
        name: "useNextAuth",
        type: "toggle",
        message: "Would you like to use Next Auth?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
    ],
  )) as {
    name: string;
    useTailwind: boolean;
    useTrpc: boolean;
    usePrisma: boolean;
    useNextAuth: boolean;
  };

  const packages: Packages = {
    tailwind: { inUse: useTailwind, installer: installers.tailwind },
    trpc: { inUse: useTrpc, installer: installers.trpc },
    prisma: { inUse: usePrisma, installer: installers.prisma },
    nextAuth: { inUse: useNextAuth, installer: installers.nextAuth },
  };

  const projectDir = await createProject(name, packages);

  await initializeGit(projectDir);

  logNextSteps(name, packages);

  const pkgJson = (await fs.readJSON(
    path.join(projectDir, "package.json"),
  )) as PackageJson;
  pkgJson.name = name;
  await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  process.exit(0);
};

main().catch((err) => {
  if (err instanceof Error) {
    console.error(err);
  }
});
