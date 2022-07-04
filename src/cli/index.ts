import type { AvailablePackages } from "../installers/index.js";
import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { CREATE_T3_APP, DEFAULT_APP_NAME } from "../consts.js";
import { availablePackages } from "../installers/index.js";
// import { getVersion } from "../utils/getT3Version.js";
import { logger } from "../utils/logger.js";
import { validateAppName } from "../utils/validateAppName.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: ["nextAuth", "prisma", "tailwind", "trpc"],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
  },
};

export const runCli = async () => {
  const cliResults = defaultOptions;

  const program = new Command().name(CREATE_T3_APP);

  // TODO: This doesn't return anything typesafe. Research other options?
  // Emulate from: https://github.com/Schniz/soundtype-commander
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
    // FIXME: Find a way to prevent the pkg manager from installing packages
    // The current method of building the package.json relies on having the users package manager run multiple 'install XYZ' calls
    // This is a good short term method to adding packages, but ultimatly it means that:
    //  A - The user runs 'add XYZ' 2-6 times over the course of scaffolding
    //  B - There is no way to easily add packages to the dependency array without also installing them
    // .option(
    //   "--noInstall",
    //   "Explicitly tell the CLI to not run the package manager's install command",
    //   false,
    // )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new t3-app",
      false,
    )
    // .version(getVersion(), "-v, --version", "Display the version number")
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

  // Needs to be seperated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  // Explained below why this is in a try/catch block
  try {
    if (!cliResults.flags.default) {
      if (!cliProvidedName) {
        const { appName } = await inquirer.prompt<Pick<CliResults, "appName">>({
          name: "appName",
          type: "input",
          message: "What will your project be called?",
          default: defaultOptions.appName,
          validate: validateAppName,
          transformer: (input: string) => {
            return input.trim();
          },
        });
        cliResults.appName = appName;
      }

      const { language } = await inquirer.prompt<{ language: string }>({
        name: "language",
        type: "list",
        message: "Will you be using JavaScript or TypeScript?",
        choices: [
          { name: "TypeScript", value: "typescript", short: "TypeScript" },
          { name: "Javascript", value: "javascript", short: "JavaScript" },
        ],
        default: "typescript",
      });

      if (language === "javascript") {
        logger.error("Wrong answer, using TypeScript instead...");
      } else {
        logger.success("Good choice! Using TypeScript!");
      }

      const { packages } = await inquirer.prompt<Pick<CliResults, "packages">>({
        name: "packages",
        type: "checkbox",
        message: "Which packages would you like to enable?",
        choices: availablePackages.map((pkgName) => ({
          name: pkgName,
          checked: false,
        })),
      });

      cliResults.packages = packages;
    }
  } catch (err) {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an error with isTTYError = true
    // If this happens, we catch the error, tell the user what has happened, and then contiue to run the program with a default t3 app
    // eslint-disable-next-line -- Otherwise we have to do some fancy namespace extension logic on the Error type which feels overkill for one line
    if (err instanceof Error && (err as any).isTTYError) {
      logger.warn(
        `${CREATE_T3_APP} needs an interactive terminal to provide options`,
      );
      logger.info(`Bootsrapping a default t3 app in ./${cliResults.appName}`);
    } else {
      throw err;
    }
  }

  return cliResults;
};
