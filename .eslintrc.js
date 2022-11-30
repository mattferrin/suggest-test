/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:functional/external-recommended",
    "plugin:functional/recommended",
    "plugin:functional/stylistic",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts"],
      rules: { "@typescript-eslint/prefer-readonly-parameter-types": "off" },
    },
    {
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/require-await": "off",
        "functional/functional-parameters": "off",
        "functional/no-expression-statement": "off",
        "functional/no-return-void": "off",
        "functional/no-throw-statement": "off",
        "functional/prefer-readonly-type": "off",
        "max-lines-per-function": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: ["tsconfig.json"],
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "functional"],
  rules: {
    "functional/no-conditional-statement": [
      "error",
      { allowReturningBranches: "ifExhaustive" },
    ],
  },
  overrides: [
    {
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/require-await": "off",
        "functional/functional-parameters": "off",
        "functional/no-expression-statement": "off",
        "functional/no-return-void": "off",
        "functional/no-throw-statement": "off",
        "functional/prefer-readonly-type": "off",
        "max-lines-per-function": "off",
      },
    },
  ],
};
