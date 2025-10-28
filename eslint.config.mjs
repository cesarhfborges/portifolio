import eslint from "@eslint/js";
import lint from "typescript-eslint";
import angular from "angular-eslint";

export default lint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...lint.configs.recommended,
      ...lint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@angular-eslint/prefer-standalone": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "max-len": ["error", { "code": 120 }],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
