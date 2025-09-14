import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores
  {
    ignores: ["dist/**"],
  },
  // Global settings
  {
    settings: { react: { version: "detect" } },
  },
  // React recommended rules
  pluginReact.configs.flat.recommended,
  // Project rules and overrides
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  // Server files specific rules
  {
    files: ["server/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
  // Config files specific rules
  {
    files: ["*.config.js", "*.config.mjs", "*.config.cjs", "vite.config.js", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-implicit-globals": "error",
    },
  },
]);
