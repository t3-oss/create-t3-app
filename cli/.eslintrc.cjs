module.exports = {
  root: true,
  extends: ["../.eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features.
    sourceType: "module", // Allows for the use of import.
    project: "./tsconfig.eslint.json", // Allows for the use of rules which require parserServices to be generated.
  },
};
