import { execa } from "../utils/execAsync";
import { PackageManager } from "../utils/getUserPkgManager";

export const installPkgs = async (opts: {
  packageManager: PackageManager;
  devMode: boolean;
  projectDir: string;
  packages: string[];
}) => {
  const { packageManager, devMode, projectDir, packages } = opts;

  const installCmd =
    packageManager === "yarn"
      ? `${packageManager} add`
      : `${packageManager} install`;
  const flag = devMode ? "-D" : "";
  const fullCmd = `${installCmd} ${flag} ${packages.join(" ")}`;
  await execa(fullCmd, { cwd: projectDir });
};
