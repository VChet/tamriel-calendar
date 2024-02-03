export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order"
  ],
  plugins: [
    "@stylistic/stylelint-plugin",
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-rem-over-px"
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
    "at-rule-empty-line-before": "never",
    "rem-over-px/rem-over-px": [true, { ignore: ["0.5px", "1px", "font-size 16px", "font-size 20px"] }],
    "rule-empty-line-before": "never",
    "selector-class-pattern": "[a-z]([a-z-]+)?(__([a-z]+-?)+)?(--([a-z]+-?)+){0,2}"
  }
};
