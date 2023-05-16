import { type AvailableDependencies } from "./dependencyVersionMap.js";
import { type Linter } from "eslint";
import fs from "fs-extra";
import path from "path";
import { format, type Config as PrettierConfig } from "prettier";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { addPackageScript } from "~/utils/addPackageScript.js";

export function buildAndWritePrettierConfig(opts: {
  projectDir: string;
  withTailwind: boolean;
}) {
  const deps: AvailableDependencies[] = [
    "prettier",
    "@types/prettier",
    "@ianvs/prettier-plugin-sort-imports",
  ];
  opts.withTailwind && deps.push("prettier-plugin-tailwindcss");

  addPackageDependency({
    dependencies: deps,
    devMode: true,
    projectDir: opts.projectDir,
  });

  const config = {
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
  } satisfies PrettierConfig;

  if (opts.withTailwind) {
    config.plugins.push("prettier-plugin-tailwindcss");
  }

  const stringedPrettierConfig = `
/** @type {import("prettier").Config} */
const config = ${JSON.stringify(config, null, 2)};

module.exports = config;
  `.trim();

  fs.writeFileSync(
    path.join(opts.projectDir, ".prettierrc.cjs"),
    format(stringedPrettierConfig, { parser: "babel" }),
  );
}

// Next.js with TypeScript Linting & Prettier
export function addPrettierToEslintConfig(opts: {
  projectDir: string;
  eslintConfig: Linter.Config;
}) {
  addPackageDependency({
    dependencies: [
      "@types/eslint",
      "eslint",
      "eslint-config-next",
      "@typescript-eslint/parser",
      "@typescript-eslint/eslint-plugin",
      "prettier",
      "@types/prettier",
      "@ianvs/prettier-plugin-sort-imports",
      "eslint-config-prettier",
    ],
    devMode: true,
    projectDir: opts.projectDir,
  });

  addPackageScript({
    projectDir: opts.projectDir,
    scripts: [
      { name: "lint", value: "next lint" },
      { name: "lint:fix", value: "next lint --fix" },
      {
        name: "format",
        value: "prettier --write . --ignore-path .gitignore",
      },
      {
        name: "format:check",
        value: "prettier --check . --ignore-path .gitignore",
      },
    ],
  });

  if (!Array.isArray(opts.eslintConfig.extends)) throw new Error("Whoops");
  opts.eslintConfig.extends.push("prettier");
}
