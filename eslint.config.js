// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";
// import tseslint from "typescript-eslint";
// import tsParser from "@typescript-eslint/parser";
// import unusedImports from "eslint-plugin-unused-imports";
// import airbnbBase from "eslint-config-airbnb-base";
// import airbnbBaseTypescript from "eslint-config-airbnb-typescript/base";


// export default defineConfig([
//   js.configs.recommended,
//   {
//     files: ["**/*.{js,mjs,cjs,ts}"],
//     languageOptions: {
//       parser: tsParser,
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         ...globals.jest,
//       },
//       plugins: {
//         "@typescript-eslint": tseslint,
//         "unused-imports": unusedImports
//       },
//       rules: {
//         ...airbnbBase.rules,
//         ...airbnbBaseTypescript.rules,
//         "no-unused-vars": "off",
//         "unused-imports/no-unused-vars": [
//           "warn",
//           {
//             vars: "all",
//             varsIgnorePattern: "^_",
//             args: "after-used",
//             argsIgnorePattern: "^_",
//             caughtErrorsIgnorePattern: "^_",
//           },
//         ],
//         settings: {
//           "import/resolver": {
//             node: {
//               extensions: [".js", ".jsx", ".ts", ".tsx"],
//             }
//           }
//         }
//       }
//     }

//   },
//   { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
//   tseslint.configs.recommended,
// ]);

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
      // ...tseslint.configs.recommended.rules,
      ...airbnbBaseTypescript.rules,

      // Mejora rendimiento: desactiva reglas duplicadas
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Reemplazo más eficiente con eslint-plugin-unused-imports
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unused-imports/no-unused-imports": "warn",
    },
  },
]);
