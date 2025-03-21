// @ts-check
import tseslint from "typescript-eslint";
// import isaacscript from "eslint-plugin-isaacscript";
import importPlugin from "eslint-plugin-import-x";

export default tseslint.config(
  { ignores: ["dist", "*.config.*"] },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      // isaacscript, // REENABLE
      "import-x": importPlugin,
    },
    extends: [
      ...tseslint.configs.recommended,
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "import-x/consistent-type-specifier-style": ["error", "prefer-inline"],

      // // For educational purposes we format our comments/jsdoc nicely
      // "isaacscript/complete-sentences-jsdoc": "warn",
      // "isaacscript/format-jsdoc-comments": "warn",

      // These lint rules don't make sense for us but are enabled in the preset configs
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/restrict-template-expressions": "off",

      // This rule doesn't seem to be working properly
      "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    // Template files don't have reliable type information
    files: ["./template/**/*.{ts,tsx}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        project: [
          "./tsconfig.eslint.json",
        ],
        // projectService: {
        //   defaultProject: "tsconfig.eslint.json",
        // },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
