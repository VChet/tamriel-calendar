import antfu from "@antfu/eslint-config";

export default antfu({
  rules: {
    "antfu/if-newline": "off",
    "curly": ["error", "multi-line"],
    "no-console": "off",
    "style/arrow-parens": ["error", "always"],
    "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "style/comma-dangle": ["error", "never"],
    "style/max-statements-per-line": "off",
    "style/operator-linebreak": ["error", "after"],
    "style/quotes": ["error", "double"],
    "style/semi": ["error", "always"],
    "ts/consistent-type-definitions": "off",
    "unicorn/prefer-includes": "off",
    "vue/block-order": ["error", { order: ["template", "script", "style"] }],
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/padding-line-between-blocks": ["error", "never"],
    "yaml/quotes": ["error", { prefer: "double" }]
  }
});
