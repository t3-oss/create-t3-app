import fs from "fs-extra";
import path from "path";
import { getVersion } from "~/utils/getT3Version.js";
import { PackageJson } from "type-fest";
import { sortPackageJson } from "sort-package-json";

type CT3APackageJSON = PackageJson & {
  ct3aMetadata?: {
    initVersion: string;
  };
};

type FinishSetupOptions = {
  projectDir: string;
  scopedAppName?: string;
};

export const finishSetup = async ({
  projectDir,
  scopedAppName,
}: FinishSetupOptions) => {
  updatesPackageJson({ projectDir, scopedAppName });
  await copyEnvFile(projectDir);
};

const updatesPackageJson = ({
  projectDir,
  scopedAppName,
}: FinishSetupOptions) => {
  let pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json"),
  ) as CT3APackageJSON;

  pkgJson.name = scopedAppName;
  pkgJson.ct3aMetadata = { initVersion: getVersion() };
  pkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });
};

const copyEnvFile = async (projectDir: string) => {
  const envFile = path.join(projectDir, ".env.example");
  const envFileExists = await fs.pathExists(envFile);

  if (envFileExists) {
    await fs.copy(envFile, path.join(projectDir, ".env"));
  }
};
