import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";
import airbnbBaseTypescript from "eslint-config-airbnb-typescript/base.js";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // Asegúrate de tener este archivo si usas TypeScript estricto
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...airbnbBaseTypescript.rules,
      // Mejora rendimiento: desactiva reglas duplicadas
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Reemplazo más eficiente con eslint-plugin-unused-imports
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unused-imports/no-unused-imports": "error",
    },
  },
]);
