import process from "node:process";
import antfu from "@antfu/eslint-config";

export default antfu({
  toml: false,
  rules: {
    "antfu/consistent-list-newline": "off",
    "antfu/if-newline": "off",
    "curly": ["error", "multi-line"],
    "import/no-useless-path-segments": ["error", {
      noUselessIndex: true
    }],
    "max-lines": ["warn", { max: 1000 }],
    "max-params": ["error", { max: 6 }],
    "no-await-in-loop": "error",
    "no-console": [process.env.NODE_ENV === "production" ? "error" : "warn", {
      allow: ["table", "info", "warn", "error"]
    }],
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-restricted-globals": ["error",
      { name: "global", message: "Use `globalThis` instead." },
      { name: "self", message: "Use `globalThis` instead." },
      { name: "location", message: "Use `window.location` instead." },
      { name: "close", message: "Use `window.close` instead." }
    ],
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-useless-concat": "error",
    "no-void": "error",
    "perfectionist/sort-imports": ["error", {
      internalPattern: ["@/**"],
      groups: [
        "builtin",
        "vue",
        "vue-libs",
        "external",
        "type",
        "internal",
        ["parent", "sibling", "index"],
        "internal-type",
        ["parent-type", "sibling-type", "index-type"],
        "side-effect",
        "vue-components",
        "object",
        "unknown"
      ],
      customGroups: {
        value: {
          "vue": "vue",
          "vue-libs": ["vue-router", "vue-i18n", "@vueuse/**/*"],
          "vue-components": ["**/*.vue", "./**/*.vue", "../**/*.vue"]
        },
        type: {
          "vue": "vue",
          "vue-libs": ["vue-router", "vue-i18n", "@vueuse/**/*"],
          "vue-components": ["**/*.vue", "./**/*.vue", "../**/*.vue"]
        }
      },
      newlinesBetween: "ignore",
      order: "asc",
      type: "natural"
    }],
    "prefer-destructuring": ["error", { array: true, object: true }],
    "require-await": "warn",
    "style/arrow-parens": ["error", "always"],
    "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "style/comma-dangle": ["error", "never"],
    "style/lines-between-class-members": "off",
    "style/max-statements-per-line": "off",
    "style/operator-linebreak": ["error", "after"],
    "style/quotes": ["error", "double"],
    "style/semi": ["error", "always"],
    "ts/array-type": "error",
    "ts/consistent-indexed-object-style": "error",
    "ts/consistent-type-definitions": "off",
    "ts/no-shadow": "error",
    "unicorn/prefer-includes": "off",
    "vue/attribute-hyphenation": ["error", "always"],
    "vue/block-order": ["error", { order: ["template", "script", "style"] }],
    "vue/comma-dangle": ["error", "never"],
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/custom-event-name-casing": ["error", "camelCase", { ignores: ["/^[a-z]+:[a-z]+[A-Z]?[a-z]+$/"] }],
    "vue/html-self-closing": ["error", { svg: "never" }],
    "vue/max-attributes-per-line": ["error", { multiline: 1, singleline: 8 }],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/no-required-prop-with-default": "error",
    "vue/operator-linebreak": ["error", "after"],
    "vue/padding-line-between-blocks": ["error", "never"],
    "vue/require-emit-validator": "warn",
    "vue/v-bind-style": ["error", "shorthand", { sameNameShorthand: "always" }],
    "vue/v-on-style": ["error", "shorthand"],
    "yaml/quotes": ["error", { prefer: "double" }]
  }
});
