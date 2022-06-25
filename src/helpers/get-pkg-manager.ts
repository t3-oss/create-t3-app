// import { execSync } from "child_process";
import { execa } from "./execa";

export type PackageManager = "npm" | "pnpm" | "yarn";

export const getPkgManager: () => PackageManager = () => {
  // This environment variable is set by npm and yarn but pnpm seems less consistent

  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else {
      return "npm";
    }
  } else {
    // If no user agent is set, assume npm
    return "npm";
  }
};

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
