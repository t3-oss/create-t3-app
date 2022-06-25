#!/usr/bin/env node
import type { PackageJson } from "type-fest";
import path from "path";
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

const titleText = `Welcome to the create-t3-app !`;

// const helpText = `
//   ${titleText}

//   Usage:
//     $ npx create-t3-app [<dir>] [flags...]
//   If <dir> is not provided up front you will be prompted for it.

//   Flags:
//     --default, -y       Bypass the CLI and use all default options to bootstrap a new t3-app
//     --no-init           Explicitly tell the CLI to not initialize a new git repo in the project
//     --no-install        Explicitly do not run the package manager's install command
//     --help, -h          Show this help message
//     --version, -v       Show the version of this script
// `;

const program = new Command()
  .name("create-t3-app")
  .usage("npx create-t3-app [<dir>] [flags...]");

const main = async () => {
  logger.error(titleText);

  program
    .description("A CLI for creating web applications with the t3 stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new t3-app",
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
    )
    .version(getVersion())
    .addHelpText("beforeAll", "\n")
    .addHelpText("after", "\n Support ping.gg")
    .parse(process.argv);

  program.outputHelp(); //DEV: Show help on every run

  const argvOptions = program.opts();

  console.log({
    args: program.args,
    argvOptions,
  });

  // FIXME: Look into if the type can be inferred
  const { name, useTailwind, useTrpc, usePrisma, useNextAuth } = (await prompts(
    [
      {
        name: "name",
        type: "text",
        message: "What will your project be called?",
        format: (input: string) => {
          if (input === "") {
            logger.warn(`Using default name: ${DEFAULT_PROJECT_NAME}`);
            return DEFAULT_PROJECT_NAME;
          }
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
