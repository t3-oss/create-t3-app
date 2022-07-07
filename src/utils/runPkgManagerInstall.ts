import type { PackageManager } from "./getUserPkgManager.js";
import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import { execa } from "./execAsync.js";
import { logger } from "./logger.js";

export const runPkgManagerInstall = async (opts: {
  pkgManager: PackageManager;
  devMode: boolean;
  projectDir: string;
  packages: string[];
  noInstallMode: boolean;
}) => {
  const { pkgManager, devMode, projectDir, packages, noInstallMode } = opts;

  if (noInstallMode) {
    const pkgJson = (await fs.readJSON(
      path.join(projectDir, "package.json"),
    )) as PackageJson;

    for (const pkg of packages) {
      if (pkg === "") {
        // sometimes empty string is passed as a package when using ternaries so escaping that to prevent it pulling node's version
        continue;
      }
      const { stdout: latestVersion } = await execa(`npm show ${pkg} version`);
      if (!latestVersion) {
        logger.warn("WARN: Failed to resolve latest version of package:", pkg);
        continue;
      }

      // Note: We know that pkgJson.[dev]Dependencies exists in the base Next.js template so we don't need to validate it
      if (devMode) {
        pkgJson.devDependencies![pkg] = `^${latestVersion.trim()}`; //eslint-disable-line @typescript-eslint/no-non-null-assertion
      } else {
        pkgJson.dependencies![pkg] = `^${latestVersion.trim()}`; //eslint-disable-line @typescript-eslint/no-non-null-assertion
      }
    }

    await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
      spaces: 2,
    });
    return;
  }

  const installCmd =
    pkgManager === "yarn" ? `${pkgManager} add` : `${pkgManager} install`;
  const flag = devMode ? "-D" : "";
  const fullCmd = `${installCmd} ${flag} ${packages.join(" ")}`;
  await execa(fullCmd, { cwd: projectDir });
};
