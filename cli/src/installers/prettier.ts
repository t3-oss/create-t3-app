import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const prettierInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: ["prettier", "@types/prettier", "eslint-config-prettier"],
    devMode: true,
  });

  const usingPrisma = packages?.prisma.inUse;
  const usingTailwind = packages?.tailwind.inUse;

  const configsDir = path.join(PKG_ROOT, "template/extras/config");

  const prettierFile =
    usingPrisma && usingTailwind
      ? "with-prisma-tailwind.cjs"
      : usingPrisma
      ? "with-prisma.cjs"
      : usingTailwind
      ? "with-tailwind.cjs"
      : "";

  const prettierCfgSrc = path.join(configsDir, "prettier", prettierFile);
  const prettierCfgDest = path.join(projectDir, "prettier.config.cjs");

  const eslintCfgSrc = path.join(configsDir, "eslint", "with-prettier.cjs");
  const eslintCfgDest = path.join(projectDir, "_eslintrc.cjs");

  fs.copySync(prettierCfgSrc, prettierCfgDest);
  fs.copySync(eslintCfgSrc, eslintCfgDest);
};
