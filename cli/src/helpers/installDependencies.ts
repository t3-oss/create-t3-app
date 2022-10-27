import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PkgInstallerMap } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

type Options = {
  packages: PkgInstallerMap;
};

export const installDependencies = async (
  projectDir: string,
  opts: Options,
) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const spinner = ora(`Running ${pkgManager} install...\n`).start();
  let flags: string[] = [];

  if (
    process.versions.node.startsWith("18") ||
    process.versions.node.startsWith("19")
  ) {
    // FIXME: temp fix for next-auth with node 18/19
    // see: https://github.com/nextauthjs/next-auth/issues/4575
    flags = [
      ...flags,
      ...(pkgManager === "yarn"
        ? ["--ignore-engines", "true"]
        : ["--engine-strict", "false"]),
    ];
  }
  if (opts.packages.nextAuth.inUse) {
    // FIXME: temp fix for NextAuth.js with Next.js 13
    flags = [
      ...flags,
      ...(pkgManager === "yarn"
        ? ["--ignore-engines", "true"]
        : ["--engine-strict", "false"]),
    ];
  }

  await execa(pkgManager, ["install", ...flags], { cwd: projectDir });

  spinner.succeed(chalk.green("Successfully installed dependencies!\n"));
};
