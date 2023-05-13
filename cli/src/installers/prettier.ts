import { type Installer } from "../installers/index.js";
import { type AvailableDependencies } from "./dependencyVersionMap.js";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { addPackageScript } from "~/utils/addPackageScript.js";

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

  addPackageScript({
    projectDir,
    scripts: [
      {
        name: "format",
        value: "pnpm format:check --write",
      },
      {
        name: "format:check",
        value:
          "pnpm prettier --check --plugin-search-dir=. **/*.{cjs,mjs,ts,tsx,md,json} --ignore-path ../.gitignore --ignore-unknown --no-error-on-unmatched-pattern",
      },
    ],
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
      path.join(PKG_ROOT, "template/extras/config/_prettier.config.cjs"),
      path.join(projectDir, "prettier.config.cjs"),
    );
  }
};
