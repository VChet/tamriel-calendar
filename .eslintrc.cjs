/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  ignorePatterns: ["dist"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        printWidth: 120,
        bracketSpacing: true,
        endOfLine: "auto"
      }
    ],
    "max-len": ["error", { code: 120, ignoreUrls: true }]
  }
};
