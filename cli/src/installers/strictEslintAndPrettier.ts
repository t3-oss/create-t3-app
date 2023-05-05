import { type Installer } from "../installers/index.js";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const strictEsLintAndPrettier: Installer = ({
  projectDir,
  packages,
}) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "prettier",
      "@types/prettier",
      "@ianvs/prettier-plugin-sort-imports",
    ],
    devMode: true,
  });

  const configDir = path.join(PKG_ROOT, "template/extras/config");

  fs.rmSync(path.join(projectDir, "_eslintrc.cjs"));
  fs.copySync(
    path.join(configDir, "_strict-eslintrc.cjs"),
    path.join(projectDir, "_eslintrc.cjs"),
  );

  if (packages?.tailwind.inUse) {
    // Include the congig with tailwind class ordering
    fs.copySync(
      path.join(configDir, "strict-prettier-with-tailwind.config.cjs"),
      path.join(projectDir, "prettier.config.cjs"),
    );
  } else {
    fs.copySync(
      path.join(configDir, "_prettier.config.cjs"),
      path.join(projectDir, "prettier.config.cjs"),
    );
  }
};
