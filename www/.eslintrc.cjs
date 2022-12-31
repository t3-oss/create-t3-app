module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    "../.eslintrc.cjs",
    "eslint:recommended",
    "plugin:astro/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {},
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "prettier/prettier": "off",
        "no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              camelCase: true,
              // FIXME: Temporarily Accepting pascalCase for React files, see https://github.com/withastro/astro/issues/4220.
              pascalCase: true,
            },
          },
        ],
      },
    },
  ],
};
