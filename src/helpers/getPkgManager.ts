import { execSync, exec } from "child_process";
import { promisify } from "util";

const execa = promisify(exec);

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

export const installPkgs = async (
  pkgMgr: PackageManager,
  isDev: boolean,
  projectDir: string,
  pkgs: string[]
) => {
  const cmd = pkgMgr === "yarn" ? "add" : "install";
  const flag = isDev ? "-D" : "";
  const fullCmd = `${pkgMgr} ${cmd} ${flag} ${pkgs.join(" ")}`;
  await execa(fullCmd, { cwd: projectDir });
};
