import type { AvailablePackages } from "src";
import chalk from "chalk";
import { Command } from "commander";
import prompts from "prompts";
import { CREATE_T3_APP, DEFAULT_APP_NAME } from "../consts";
import { getVersion } from "../utils/getT3Version";
import { logger } from "../utils/logger";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}

interface CliResults {
  appName: string;
  usePackages: Record<AvailablePackages, boolean>;
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  usePackages: {
    nextAuth: true,
    prisma: true,
    tailwind: true,
    trpc: true,
  },
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
  },
};

export const runCli = async () => {
  const cliResults = defaultOptions;

  const program = new Command().name(CREATE_T3_APP);

  //TODO: This doesn't return anything typesafe. Research other options
  program
    .description("A CLI for creating web applications with the t3 stack")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false,
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false,
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new t3-app",
      false,
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

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }
  cliResults.flags = program.opts();

  //DEV
  console.log({
    cliResults,
  });

  if (!cliResults.flags.default) {
    // FIXME: Look into if the type can be inferred
    const promptResults = (await prompts([
      {
        name: "name",
        type: !!cliProvidedName ? null : "text",
        message: "What will your project be called?",
        initial: DEFAULT_APP_NAME,
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
    ])) as {
      name: string;
      useTailwind: boolean;
      useTrpc: boolean;
      usePrisma: boolean;
      useNextAuth: boolean;
    };

    cliResults.appName = promptResults.name;
    cliResults.usePackages.nextAuth = promptResults.useNextAuth;
    cliResults.usePackages.prisma = promptResults.usePrisma;
    cliResults.usePackages.tailwind = promptResults.useTailwind;
    cliResults.usePackages.trpc = promptResults.useTrpc;
  }

  return cliResults;
};
