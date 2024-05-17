import path from "path";
import fs from "fs-extra";

import { _initialConfig } from "~/../template/extras/config/_eslint.js";
import { type Installer } from "~/installers/index.js";

export const dynamicEslintInstaller: Installer = ({ projectDir, packages }) => {
  const usingDrizzle = !!packages?.drizzle?.inUse;

  const eslintConfig = getEslintConfig({ usingDrizzle });

  // Convert config from _eslint.config.json to .eslintrc.cjs
  const eslintrcFileContents = [
    '/** @type {import("eslint").Linter.Config} */',
    `const config = ${JSON.stringify(eslintConfig, null, 2)}`,
    "module.exports = config;",
  ].join("\n");

  const eslintConfigDest = path.join(projectDir, ".eslintrc.cjs");
  fs.writeFileSync(eslintConfigDest, eslintrcFileContents, "utf-8");
};

const getEslintConfig = ({ usingDrizzle }: { usingDrizzle: boolean }) => {
  const eslintConfig = _initialConfig;

  if (usingDrizzle) {
    eslintConfig.plugins = [...(eslintConfig.plugins ?? []), "drizzle"];

    eslintConfig.rules = {
      ...eslintConfig.rules,
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
    };
  }
  return eslintConfig;
};
