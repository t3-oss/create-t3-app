import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { type Installer } from "../installers/index.js";
import { type AvailableDependencies } from "./dependencyVersionMap.js";

export const prettier: Installer = ({ projectDir, packages }) => {
  const packeagesToInstall: AvailableDependencies[] = [
    "prettier",
    "@types/prettier",
    "@ianvs/prettier-plugin-sort-imports",
  ];

  if (packages?.tailwind.inUse) {
    packeagesToInstall.push("prettier-plugin-tailwindcss");
  }

  addPackageDependency({
    projectDir,
    dependencies: packeagesToInstall,
    devMode: true,
  });

  if (packages?.tailwind.inUse) {
    fs.copySync(
      path.join(
        PKG_ROOT,
        "template/extras/config/prettier-with-tailwind.config.cjs",
      ),
      path.join(projectDir, "prettier.config.cjs"),
    );
  } else {
    fs.copySync(
      path.join(PKG_ROOT, "template/extras/config/prettier.config.cjs"),
      path.join(projectDir, "prettier.config.cjs"),
    );
  }
};
