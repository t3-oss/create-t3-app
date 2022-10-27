import chalk from "chalk";
import { execa } from "execa";
import ora from "ora";
import { PkgInstallerMap } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { logger } from "~/utils/logger.js";

type Options = {
  projectDir: string;
  packages: PkgInstallerMap;
};

export const installDependencies = async ({
  projectDir,
  packages,
}: Options) => {
  logger.info("Installing dependencies...");
  const pkgManager = getUserPkgManager();
  const spinner = ora(`Running ${pkgManager} install...\n`).start();
  let flags: string[] = [];

  // FIXME: temp fix for NextAuth.js with node 18/19
  // see: https://github.com/nextauthjs/next-auth/issues/4575
  if (
    process.versions.node.startsWith("18") ||
    process.versions.node.startsWith("19")
  ) {
    flags = [
      ...flags,
      ...(pkgManager === "yarn"
        ? ["--ignore-engines", "true"]
        : ["--engine-strict", "false"]),
    ];
  }

  // FIXME: temp fix for NextAuth.js with Next.js 13
  if (packages.nextAuth.inUse) {
    flags = [
      ...flags,
      ...(pkgManager === "pnpm"
        ? ["--strict-peer-dependencies", "false"]
        : pkgManager === "npm"
        ? ["--legacy-peer-deps", "true"]
        : []),
    ];
  }

  await execa(pkgManager, ["install", ...flags], { cwd: projectDir });

  spinner.succeed(chalk.green("Successfully installed dependencies!\n"));
};
