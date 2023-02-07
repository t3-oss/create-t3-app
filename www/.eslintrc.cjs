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
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features.
    sourceType: "module", // Allows for the use of import.
    project: "./tsconfig.eslint.json", // Allows for the use of rules which require parserServices to be generated.
    extraFileExtensions: [".astro"],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
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
      rules: {
        "no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
