#!/usr/bin/env node
import path from "path";
import { execa } from "execa";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { runCli } from "~/cli/index.js";
import {
  createProject,
  initializeGit,
  installDependencies,
  logNextSteps,
  setImportAlias,
} from "~/helpers/main.js";
import { buildPkgInstallerMap } from "~/installers/main.js";
import {
  getNpmVersion,
  getUserPkgManager,
  getVersion,
  logger,
  parseNameAndPath,
  renderTitle,
  renderVersionWarning,
} from "~/utils/main.js";

type CT3APackageJSON = PackageJson & {
  ct3aMetadata?: {
    initVersion: string;
  };
};

const main = async () => {
  const npmVersion = await getNpmVersion();
  const pkgManager = getUserPkgManager();
  renderTitle();
  if (npmVersion) {
    renderVersionWarning(npmVersion);
  }

  const {
    appName,
    packages,
    flags: { noGit, noInstall, importAlias, appRouter },
    databaseProvider,
  } = await runCli();

  const usePackages = buildPkgInstallerMap(packages, databaseProvider);

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    packages: usePackages,
    databaseProvider,
    importAlias,
    noInstall,
    appRouter,
  });

  // Write name to package.json
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as CT3APackageJSON;
  pkgJson.name = scopedAppName;
  pkgJson.ct3aMetadata = { initVersion: getVersion() };

  // ? Bun doesn't support this field (yet)
  if (pkgManager !== "bun") {
    const { stdout } = await execa(pkgManager, ["-v"], {
      cwd: projectDir,
    });
    pkgJson.packageManager = `${pkgManager}@${stdout.trim()}`;
  }

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  // update import alias in any generated files if not using the default
  if (importAlias !== "~/") {
    setImportAlias(projectDir, importAlias);
  }

  if (!noInstall) {
    await installDependencies({ projectDir });
  }

  if (!noGit) {
    await initializeGit(projectDir);
  }

  await logNextSteps({
    projectName: appDir,
    packages: usePackages,
    appRouter,
    noInstall,
    projectDir,
    databaseProvider,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
