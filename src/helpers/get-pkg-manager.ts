import { execSync } from "child_process";
import { execa } from "./execa";

export type PackageManager = "npm" | "pnpm" | "yarn";

export const getPkgManager: () => PackageManager = () => {
  try {
    const userAgent = process.env.npm_config_user_agent;

    if (userAgent) {
      if (userAgent.startsWith("yarn")) {
        return "yarn";
      } else if (userAgent.startsWith("pnpm")) {
        return "pnpm";
      }
    }
    try {
      execSync("yarn --version", { stdio: "ignore" });
      return "yarn";
    } catch {
      execSync("pnpm --version", { stdio: "ignore" });
      return "pnpm";
    }
  } catch {
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
