const config = {
  ignoreFiles: ["**/*.{ts,tsx,js,jsx}"],
  extends: [
    "stylelint-prettier",
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
  ],
  rules: {
    "import-notation": ["string"],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "layer",
          "apply",
          "variants",
          "responsive",
          "screen",
          "include",
          "for",
          "mixin",
          "if",
          "else",
          "warn",
          "return",
          "function",
          "use",
          "each",
        ],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["font-named-instance"],
      },
    ],
  },
};
module.exports = config;
