import {
  addPrettierToEslintConfig,
  buildAndWritePrettierConfig,
} from "./prettier.js";
import { type Linter } from "eslint";
import fs from "fs-extra";
import path from "path";
import { format } from "prettier";
import { addPackageDependency } from "~/utils/addPackageDependency.js";
import { addPackageScript } from "~/utils/addPackageScript.js";

export type CliLinterConfig = {
  strict: boolean;
  withPrettier: boolean;
  withTailwind: boolean;
};

export function setupLinter(opts: {
  projectDir: string;
  linterConfig: CliLinterConfig;
}) {
  const { linterConfig } = opts;

  // Every installer shares these scripts and deps
  addPackageScript({
    projectDir: opts.projectDir,
    scripts: [
      { name: "lint", value: "next lint" },
      { name: "lint:fix", value: "next lint --fix" },
    ],
  });
  addPackageDependency({
    dependencies: ["@types/eslint", "eslint", "eslint-config-next"],
    devMode: true,
    projectDir: opts.projectDir,
  });

  const eslintConfig = opts.linterConfig.strict
    ? strictEslint({ projectDir: opts.projectDir })
    : baseEslint({ projectDir: opts.projectDir });

  if (linterConfig.withPrettier) {
    buildAndWritePrettierConfig({
      projectDir: opts.projectDir,
      withTailwind: linterConfig.withTailwind,
    });
    addPrettierToEslintConfig({
      projectDir: opts.projectDir,
      eslintConfig,
    });
  } else if (linterConfig.withTailwind) {
    addPackageDependency({
      dependencies: [
        "@types/prettier",
        "prettier",
        "prettier-plugin-tailwindcss",
      ],
      devMode: true,
      projectDir: opts.projectDir,
    });
  }

  const stringedEslintConfig = `
/** @type {import("eslint").Linter.Config} */
const config = ${JSON.stringify(eslintConfig, null, 2)};

module.exports = config;
  `.trim();

  fs.writeFileSync(
    path.join(opts.projectDir, ".eslintrc.cjs"),
    format(stringedEslintConfig, { parser: "babel" }),
  );
}

// Just the base Next.js ESLint
const baseEslint = (_opts: { projectDir: string }) => {
  const config = {
    extends: ["next", "next/core-web-vitals"],
  } satisfies Linter.Config;

  return config;
};

// Next.js with TypeScript Linting
const strictEslint = (opts: { projectDir: string }) => {
  addPackageDependency({
    dependencies: [
      "@typescript-eslint/parser",
      "@typescript-eslint/eslint-plugin",
    ],
    devMode: true,
    projectDir: opts.projectDir,
  });

  const config: Linter.Config = {
    overrides: [
      {
        extends: [
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ],
        files: ["*.ts", "*.tsx"],
        parserOptions: {
          project: path.join(__dirname, "tsconfig.json"),
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: path.join(__dirname, "tsconfig.json"),
    },
    plugins: ["@typescript-eslint"],
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  };

  return config;
};
