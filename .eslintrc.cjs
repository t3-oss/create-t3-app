module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["turbo"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
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
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of import
    project: "./tsconfig.eslint.json", // Allows for the use of rules which require parserServices to be generated
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
