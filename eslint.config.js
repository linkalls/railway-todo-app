import js from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import globals from "globals"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
])
