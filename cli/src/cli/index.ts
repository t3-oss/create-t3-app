import type { AvailablePackages } from "~/installers/index.js";
import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { CREATE_T3_APP, DEFAULT_APP_NAME } from "~/consts.js";
import { availablePackages } from "~/installers/index.js";
import { getVersion } from "~/utils/getT3Version.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";
import { validateAppName } from "~/utils/validateAppName.js";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  CI: boolean /** @internal - used in CI */;
  tailwind: boolean /** @internal - used in CI */;
  trpc: boolean /** @internal - used in CI */;
  prisma: boolean /** @internal - used in CI */;
  nextAuth: boolean /** @internal - used in CI */;
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
    CI: false,
    tailwind: false,
    trpc: false,
    prisma: false,
    nextAuth: false,
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
    /** START CI-FLAGS */
    /**
     * @internal - used for CI E2E tests
     * If any of the following option-flags are provided, we skip prompting
     */
    .option("--CI", "Boolean value if we're running in CI", false)
    /**
     * @internal - used for CI E2E tests
     * If any of the following option-flags are provided, we skip prompting
     */
    .option(
      "--tailwind <tailwind>",
      "Boolean value if we should install tailwind",
      (value) => value === "tailwind",
    )
    /**
     * @internal - used for CI E2E tests
     * If any of the following option-flags are provided, we skip prompting
     */
    .option(
      "--nextAuth <boolean>",
      "Boolean value if we should install nextAuth",
      (value) => value === "nextAuth",
    )
    /**
     * @internal - used for CI E2E tests
     * If any of the following option-flags are provided, we skip prompting
     */
    .option(
      "--prisma <boolean>",
      "Boolean value if we should install prisma",
      (value) => value === "prisma",
    )
    /**
     * @internal - used for CI E2E tests
     * If any of the following option-flags are provided, we skip prompting
     */
    .option(
      "--trpc <boolean>",
      "Boolean value if we should install trpc",
      (value) => value === "trpc",
    )
    /** END CI-FLAGS */
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

  // FIXME: TEMPORARY WARNING WHEN USING YARN 3. SEE ISSUE #57
  if (process.env.npm_config_user_agent?.startsWith("yarn/3")) {
    logger.warn(`  WARNING: It looks like you are using Yarn 3. This is currently not supported,
  and likely to result in a crash. Please run create-t3-app with another
  package manager such as pnpm, npm, or Yarn Classic.
  See: https://github.com/t3-oss/create-t3-app/issues/57`);
  }

  // FIXME: TEMPORARY WARNING WHEN USING NODE 18. SEE ISSUE #59
  if (process.versions.node.startsWith("18")) {
    logger.warn(`  WARNING: You are using Node.js version 18. This is currently not compatible with Next-Auth.
  If you want to use Next-Auth, switch to a previous version of Node, e.g. 16 (LTS).
  If you have nvm installed, use 'nvm install --lts' to switch to the latest LTS version of Node.
    `);

    cliResults.packages = cliResults.packages.filter(
      (val) => val !== "nextAuth",
    );
  }

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  /**
   * @internal - used for CI E2E tests
   */
  let CIMode = false;
  if (cliResults.flags.CI) {
    CIMode = true;
    cliResults.packages = [];
    if (cliResults.flags.trpc) cliResults.packages.push("trpc");
    if (cliResults.flags.tailwind) cliResults.packages.push("tailwind");
    if (cliResults.flags.prisma) cliResults.packages.push("prisma");
    if (cliResults.flags.nextAuth) cliResults.packages.push("nextAuth");
  }

  const pkgManager = getUserPkgManager();

  // Explained below why this is in a try/catch block
  try {
    // if --packages flag is set, we are running in CI mode and should not prompt the user
    // if --default flag is set, we should not prompt the user
    if (!cliResults.flags.default && !CIMode) {
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
          { name: "JavaScript", value: "javascript", short: "TypeScript" }, // Both options should have 'TypeScript' as the short value to improve UX and reduce confusion
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
        choices: availablePackages
          .filter((pkg) => pkg !== "envVariables") // dont prompt for env-vars
          .map((pkgName) => ({
            name: pkgName,
            checked: false,
            // FIXME: TEMPORARY WARNING WHEN USING NODE 18. SEE ISSUE #59
            disabled:
              pkgName === "nextAuth" && process.versions.node.startsWith("18")
                ? "Node.js version 18 is currently not compatible with Next-Auth."
                : false,
          })),
      });

      cliResults.packages = packages;

      // Skip if noGit flag provided
      if (!cliResults.flags.noGit) {
        const { git } = await inquirer.prompt<{ git: boolean }>({
          name: "git",
          type: "confirm",
          message: "Initialize a new git repository?",
          default: true,
        });
        if (git) {
          logger.success("Nice one! Initializing repository!");
        } else {
          cliResults.flags.noGit = true;
          logger.info("Sounds good! You can come back and run git init later.");
        }
      }

      if (!cliResults.flags.noInstall) {
        const { runInstall } = await inquirer.prompt<{ runInstall: boolean }>({
          name: "runInstall",
          type: "confirm",
          message: `Would you like us to run ${pkgManager} install?`,
          default: true,
        });

        if (runInstall) {
          logger.success("Alright. We'll install the dependencies for you!");
        } else {
          cliResults.flags.noInstall = true;
          logger.info(
            `No worries. You can run '${pkgManager} install' later to install the dependencies.`,
          );
        }
      }
    }
  } catch (err) {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an error with isTTYError = true
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default t3 app
    // eslint-disable-next-line -- Otherwise we have to do some fancy namespace extension logic on the Error type which feels overkill for one line
    if (err instanceof Error && (err as any).isTTYError) {
      logger.warn(
        `${CREATE_T3_APP} needs an interactive terminal to provide options`,
      );
      logger.info(`Bootstrapping a default t3 app in ./${cliResults.appName}`);
    } else {
      throw err;
    }
  }

  return cliResults;
};
