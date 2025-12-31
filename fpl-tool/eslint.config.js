import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unusedImports from "eslint-plugin-unused-imports"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["dist"]),

  // Base JS recommended
  js.configs.recommended,

  // TypeScript (type-aware). Requires a tsconfig.json in the project.
  ...tseslint.configs.recommendedTypeChecked,

  // React hooks + Vite refresh
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  // Your project rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        // Flat-config equivalent of "project": true.
        // Uses the nearest tsconfig.json.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // From your .eslintrc.json
      "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "require-await": "error",
      "no-return-await": "error",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "unused-imports/no-unused-imports": "error",

      "no-console": ["error", { allow: ["warn", "error", "debug"] }],

      "semi": ["error", "never"],
      "quotes": ["error", "double", { avoidEscape: true }],

      // Prettier as an ESLint rule
      "prettier/prettier": "error",
    },
  },

  // Must be last: disables ESLint formatting rules that conflict with Prettier
  prettierConfig,
])
