import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",

  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: "single", // or 'double'
  },

  typescript: true,
  vue: false,
  react: true,
  jsonc: false,
  yaml: false,
  ignores: [
    "/dist",
    "/node_modules",
    "/build-config",
    "/webpack.config.js",
    "lib",
    "/build",
    "/.vscode",
    "/数据备份",
    ".yarn",
    "/cicd",
    "/public",
    "./src/ui",
    "./src/ui/*",
  ],
  rules: {
    "ts/no-duplicate-enum-values": "off",
    "react/no-create-ref": "off",
    "ts/ban-ts-comment": "off",
    "no-console": "off",
    "unused-imports/no-unused-vars": "off",
    "node/prefer-global/process": "off",
    "jsdoc/require-returns-description": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "no-unused-vars": "off",
    "ts/no-unused-expressions": "off",
    "react/no-unstable-default-props": "off",
    "prefer-promise-reject-errors": "off",
    "react/no-unstable-context-value": "off",
    "ts/no-unsafe-function-type": "off",
    "ts/no-empty-object-type": "off",
    "react/prefer-shorthand-boolean": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/no-array-index-key": "off",
    "react/prefer-destructuring-assignment": "off",
    "react-dom/no-missing-iframe-sandbox": "off",
  },
});
