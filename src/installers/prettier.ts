import { installPkgs } from "../helpers/get-pkg-manager";
import { type Installer } from "./index";
import fs from "fs-extra";
import path from "path";

export const prettierInstaller: Installer = async (
  projectDir,
  packageManager,
  _packages
) => {
  await installPkgs({
    packageManager,
    projectDir,
    packages: ["prettier"],
    devMode: true,
  });

  const prettierrcPath = path.join(projectDir, ".prettierrc");
  await fs.writeFile(
    prettierrcPath,
    JSON.stringify(
      {
        tabWidth: 2,
        useTabs: false,
        semi: true,
      },
      null,
      2
    )
  );
};
