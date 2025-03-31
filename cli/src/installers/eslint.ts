import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { addPackageScript } from "~/utils/addPackageScript.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { type AvailableDependencies } from "./dependencyVersionMap.js";

// Also installs prettier
export const dynamicEslintInstaller: Installer = ({ projectDir, packages }) => {
  const devPackages: AvailableDependencies[] = [
    "prettier",
    "eslint",
    "eslint-config-next",
    "typescript-eslint",
    "@eslint/eslintrc",
  ];

  if (packages?.tailwind.inUse) {
    devPackages.push("prettier-plugin-tailwindcss");
  }
  if (packages?.drizzle.inUse) {
    devPackages.push("eslint-plugin-drizzle");
  }

  addPackageDependency({
    projectDir,
    dependencies: devPackages,
    devMode: true,
  });
  const extrasDir = path.join(PKG_ROOT, "template/extras");

  // Prettier
  let prettierSrc: string;
  if (packages?.tailwind.inUse) {
    prettierSrc = path.join(extrasDir, "config/_tailwind.prettier.config.js");
  } else {
    prettierSrc = path.join(extrasDir, "config/_prettier.config.js");
  }
  const prettierDest = path.join(projectDir, "prettier.config.js");

  fs.copySync(prettierSrc, prettierDest);

  // pnpm
  const pkgManager = getUserPkgManager();
  if (pkgManager === "pnpm") {
    const pnpmSrc = path.join(extrasDir, "pnpm/_npmrc");
    fs.copySync(pnpmSrc, path.join(projectDir, ".npmrc"));
  }

  addPackageScript({
    projectDir,
    scripts: {
      lint: "next lint",
      "lint:fix": "next lint --fix",
      check: "next lint && tsc --noEmit",
      "format:write": 'prettier --write "**/*.{ts,tsx,js,jsx,mdx}" --cache',
      "format:check": 'prettier --check "**/*.{ts,tsx,js,jsx,mdx}" --cache',
    },
  });

  // eslint
  const usingDrizzle = !!packages?.drizzle?.inUse;
  const eslintConfigSrc = path.join(
    extrasDir,
    usingDrizzle ? "config/_eslint.drizzle.js" : "config/_eslint.base.js"
  );
  const eslintConfigDest = path.join(projectDir, "eslint.config.js");

  fs.copySync(eslintConfigSrc, eslintConfigDest);
};
