module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  plugins: ["import", "prettier"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "import/order": ["error"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
