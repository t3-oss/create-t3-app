import type { AvailablePackages } from "~/installers/index.js";
import { availablePackages } from "~/installers/index.js";
import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import { CREATE_T3_APP, DEFAULT_APP_NAME } from "~/consts.js";
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
     * @experimental - used for CI E2E tests
     * If any of the following option-flags are provided, we skip prompting
     */
    .option("--CI", "Boolean value if we're running in CI", false)
    /**
     * @experimental - used for CI E2E tests
     * Used in conjunction with `--CI` to skip prompting
     */
    .option(
      "--tailwind [boolean]",
      "Experimental: Boolean value if we should install Tailwind CSS. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false",
    )
    /**
     * @experimental - used for CI E2E tests
     * Used in conjunction with `--CI` to skip prompting
     */
    .option(
      "--nextAuth [boolean]",
      "Experimental: Boolean value if we should install NextAuth.js. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false",
    )
    /**
     * @experimental - used for CI E2E tests
     * Used in conjunction with `--CI` to skip prompting
     */
    .option(
      "--prisma [boolean]",
      "Experimental: Boolean value if we should install Prisma. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false",
    )
    /**
     * @experimental - used for CI E2E tests
     * Used in conjunction with `--CI` to skip prompting
     */
    .option(
      "--trpc [boolean]",
      "Experimental: Boolean value if we should install tRPC. Must be used in conjunction with `--CI`.",
      (value) => !!value && value !== "false",
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

  // Explained below why this is in a try/catch block
  try {
    // if --CI flag is set, we are running in CI mode and should not prompt the user
    // if --default flag is set, we should not prompt the user
    if (!cliResults.flags.default && !CIMode) {
      if (!cliProvidedName) {
        cliResults.appName = await promptAppName();
      }

      await promptLanguage();
      cliResults.packages = await promptPackages();
      if (!cliResults.flags.noGit) {
        cliResults.flags.noGit = !(await promptGit());
      }

      if (!cliResults.flags.noInstall) {
        cliResults.flags.noInstall = !(await promptInstall());
      }
    }
  } catch (err) {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an error with isTTYError = true
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default t3 app
    // Otherwise we have to do some fancy namespace extension logic on the Error type which feels overkill for one line
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

const promptAppName = async (): Promise<string> => {
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

  return appName;
};

const promptLanguage = async (): Promise<void> => {
  const { language } = await inquirer.prompt<{ language: string }>({
    name: "language",
    type: "list",
    message: "Will you be using TypeScript or JavaScript?",
    choices: [
      { name: "TypeScript", value: "typescript", short: "TypeScript" },
      { name: "JavaScript", value: "javascript", short: "JavaScript" },
    ],
    default: "typescript",
  });

  if (language === "javascript") {
    logger.error("Wrong answer, using TypeScript instead...");
  } else {
    logger.success("Good choice! Using TypeScript!");
  }
};

const promptPackages = async (): Promise<AvailablePackages[]> => {
  const { packages } = await inquirer.prompt<Pick<CliResults, "packages">>({
    name: "packages",
    type: "checkbox",
    message: "Which packages would you like to enable?",
    choices: availablePackages
      .filter((pkg) => pkg !== "envVariables") // dont prompt for env-vars
      .map((pkgName) => ({
        name: pkgName,
        checked: false,
      })),
  });

  return packages;
};

const promptGit = async (): Promise<boolean> => {
  const { git } = await inquirer.prompt<{ git: boolean }>({
    name: "git",
    type: "confirm",
    message: "Initialize a new git repository?",
    default: true,
  });

  if (git) {
    logger.success("Nice one! Initializing repository!");
  } else {
    logger.info("Sounds good! You can come back and run git init later.");
  }

  return git;
};

const promptInstall = async (): Promise<boolean> => {
  const pkgManager = getUserPkgManager();

  const { install } = await inquirer.prompt<{ install: boolean }>({
    name: "install",
    type: "confirm",
    message:
      `Would you like us to run '${pkgManager}` +
      (pkgManager === "yarn" ? `'?` : ` install'?`),
    default: true,
  });

  if (install) {
    logger.success("Alright. We'll install the dependencies for you!");
  } else {
    if (pkgManager === "yarn") {
      logger.info(
        `No worries. You can run '${pkgManager}' later to install the dependencies.`,
      );
    } else {
      logger.info(
        `No worries. You can run '${pkgManager} install' later to install the dependencies.`,
      );
    }
  }

  return install;
};
