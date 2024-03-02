import path from "path";
import fs from "fs-extra";

import { type Installer } from "~/installers/index.js";

export const dynamicEslintInstaller: Installer = ({ projectDir, packages }) => {
  const usingDrizzle = !!packages?.drizzle?.inUse;

  const _eslintConfigSrc = path.join(projectDir, "_eslint.config.json");

  const eslintConfig = JSON.parse(
    fs.readFileSync(_eslintConfigSrc).toString()
  ) as Record<string, unknown>;

  if (usingDrizzle) {
    eslintConfig.plugins = [...(eslintConfig.plugins as string[]), "drizzle"];

    const lintRules = {
      "drizzle/enforce-delete-with-where": "error",
      "drizzle/enforce-update-with-where": "error",
    };

    eslintConfig.rules = {
      ...(eslintConfig.rules as Record<string, unknown>),
      ...lintRules,
    };
  }

  // Convert config from _eslint.config.json to .eslintrc.cjs
  const eslintrcFileContents = [
    '/** @type {import("eslint").Linter.Config} */',
    `const config = ${JSON.stringify(eslintConfig, null, 2)}`,
    "module.exports = config;",
  ].join("\n");

  const eslintConfigDest = path.join(projectDir, ".eslintrc.cjs");
  fs.writeFileSync(eslintConfigDest, eslintrcFileContents, "utf-8");
};
