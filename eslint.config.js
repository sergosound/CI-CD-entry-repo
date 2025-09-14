import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

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
    plugins: { 
      js,
      import: pluginImport,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      
      // Import ordering rules
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",    // Node built-in modules
            "external",   // npm packages
            "internal",   // Internal modules (using path mapping)
            "parent",     // Relative imports from parent directories
            "sibling",    // Relative imports from same directory
            "index"       // Index file imports
          ],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "react-dom",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "react-router-dom",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@/**",
              "group": "internal"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "never",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      "import/no-unresolved": "off", // Disable for now since we're not using TypeScript
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "off",
      "import/no-absolute-path": "error"
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
