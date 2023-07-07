import chalk from "chalk";
import fs from "fs-extra";
import { Ora } from "ora";
import path from "path";
import { env } from "process";

// this function first checks if one of the following env variables is set
// T3_CONFIG, XDG_CONFIG_HOME, HOME
// if so given path is joined with t3stack/ (unless it's the T3_CONFIG var, then it uses the directory directly) and override/
// then the first path, which exists, is returned
const getOverridePath = (): string | undefined => {
  return ["T3_CONFIG", "XDG_CONFIG_HOME", "HOME"]
    .map((key) => [key, env[key]])
    .filter(([_, envValue]) => envValue !== undefined)
    .map(([envKey, envValue]) =>
      path.join(
        envValue as string,
        envKey === "T3_CONFIG" ? "." : "t3stack",
        "override"
      )
    )
    .find(fs.existsSync);
};

export const overrideDefaults = (spinner: Ora, projectPath: string) => {
  const overridePath = getOverridePath();
  if (!overridePath) return;

  spinner.info(
    chalk.green(
      `Found override directory - ${chalk.bgGreen(chalk.white(overridePath))}`
    )
  );

  fs.copySync(overridePath, projectPath, { overwrite: true });

  spinner.info(
    chalk.green("Successfully override files in just created project")
  );
};
