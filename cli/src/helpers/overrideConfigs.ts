import ora from "ora";
import { PkgInstallerMap } from "~/installers/index.js";
import fs from "fs-extra";
import path from "path";

type overrideConfigOptions = {
  twConfig?: string | undefined;
  tsConfig?: string | undefined;
  packages?: PkgInstallerMap;
  projectDir: string;
};

export const overrideConfigs = ({
  twConfig,
  tsConfig,
  packages,
  projectDir,
}: overrideConfigOptions) => {
  if (twConfig !== undefined || tsConfig !== undefined) {
    const spinner = ora("Config overrides detected").start();
    spinner.info("Config overrides detected");
    if (twConfig) {
      if (fs.existsSync(twConfig) && packages?.tailwind?.inUse) {
        spinner.info(`Overriding default tailwind.config.cjs with ${twConfig}`);
        fs.unlinkSync(path.join(projectDir, "tailwind.config.cjs"));
        fs.copyFileSync(twConfig, path.join(projectDir, "tailwind.config.cjs"));
        spinner.info("successfully copied tailwind config");
      } else if (!packages?.tailwind?.inUse) {
        spinner.info("Tailwind not in use, skipping override");
      } else {
        spinner.fail(`Could not find ${twConfig}`);
      }
    }
    if (tsConfig) {
      if (fs.existsSync(tsConfig)) {
        spinner.info(`Overriding default tsconfig.json with ${tsConfig}`);
        fs.unlinkSync(path.join(projectDir, "tsconfig.json"));
        fs.copyFileSync(tsConfig, path.join(projectDir, "tsconfig.json"));
        spinner.info("successfully copied typescript config");
      } else {
        spinner.fail(`Could not find ${tsConfig}`);
      }
    }
    spinner.warn(
      "WARNING: create-t3-app does not take responsibility for any issues caused by overriding default configs",
    );
    spinner.succeed("Config overrides complete");
  }
};
