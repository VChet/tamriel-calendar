export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order"
  ],
  plugins: [
    "@stylistic/stylelint-plugin",
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties"
  ],
  customSyntax: "postcss-scss",
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html"
    }
  ],
  ignoreFiles: [
    "dist/**/*css"
  ],
  rules: {
    "@stylistic/color-hex-case": "lower",
    "rule-empty-line-before": "never",
    "selector-class-pattern": "[a-z]([a-z-]+)?(__([a-z]+-?)+)?(--([a-z]+-?)+){0,2}"
  }
};
