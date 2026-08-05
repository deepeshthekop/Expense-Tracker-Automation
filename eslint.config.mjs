import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwrightPlugin from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Global ignore patterns (replaces .eslintignore)
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'dist/', '.auth/'],
  },

  // TypeScript & Playwright configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      // Recommended TypeScript Rules
      ...tsPlugin.configs.recommended.rules,

      // Recommended Playwright Rules (catches missing awaits, invalid expect statements)
      ...playwrightPlugin.configs['flat/recommended'].rules,

      // Custom rule adjustments
      'playwright/no-skipped-test': 'warn',
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: [
            'expect',
            'verifyNavLinksVisible',
            'verifyDashboardComponentsVisible',
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'playwright/missing-playwright-await': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-wait-for-timeout': 'error',
    },
  },
  // Disable ESLint formatting rules (MUST be the last item in the array)
  eslintConfigPrettier,
];
