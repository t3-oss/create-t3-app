/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: [
    // Provides extra useful rules:
    // https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript
    "isaacscript",
    "import",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./cli/tsconfig.json", "./www/tsconfig.json"],
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs.
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
    // These rules auto-format comments, similar to how Prettier auto-formats code. For more
    // information, see:
    // https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/comments.md
    "isaacscript/complete-sentences-jsdoc": "warn",
    "isaacscript/format-jsdoc-comments": "warn",
  },
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["**/*.ts", "**/*.tsx"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: [
          "./tsconfig.json",
          "./cli/tsconfig.json",
          "./www/tsconfig.json",
        ],
      },
      rules: {
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/restrict-template-expressions": "off",

        // These rules are only disabled because we hit a bug in linting.
        // See https://github.com/t3-oss/create-t3-app/pull/1036#discussion_r1060505136
        // If you still see the bug once TypeScript@5 is used, please let typescript-eslint know!
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
      },
    },
  ],
};
