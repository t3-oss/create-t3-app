const config = {
  ignoreFiles: ["**/*.{ts,tsx,js,jsx}"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-prettier/recommended",
  ],
  plugins: ["stylelint-prettier"],
  rules: {
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
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "number-leading-zero": null,
    "length-zero-no-unit": null,
    "alpha-value-notation": null,
    "selector-id-pattern": null,
    "selector-class-pattern": null,
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "scss/no-global-function-names": null,
    "scss/double-slash-comment-empty-line-before": null,
  },
};

module.exports = config;
