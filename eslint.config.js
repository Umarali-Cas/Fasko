import js from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  prettierPluginRecommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      // ...js.configs.recommended.rules,
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
      'no-empty-pattern': 'off',
    },
  },
  { ignores: ['dist', 'node_modules', '*.json', '*config.*'] },
]
