/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier"
  ],
  plugins: ["@typescript-eslint", "import"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true
    },
    lintAllEsApis: true
  },
  env: { browser: true },
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
    "import/order": [
      "error",
      {
        "newlines-between": "never",
        groups: ["external", "builtin", "internal", "parent", "index", "sibling", "object", "type"]
      }
    ],
    "max-len": ["error", { code: 120, ignoreUrls: true }],
    "import/no-unresolved": ["error", { ignore: ["^virtual:"] }],
    "import/no-named-as-default-member": "off"
  }
};
