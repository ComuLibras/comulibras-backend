import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['**/prisma/generated/**', '**/*.d.ts', '**/dist/**'],
    plugins: {
      js,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    extends: ['js/recommended'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-namespace': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-duplicate-imports': ['error', { includeExports: true }],
      'no-console': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Dependências externas (node_modules) - sempre primeiro
            ['^react', '^@?\\w'],
            // Config imports
            ['^@config'],
            // Domain imports separados por domínio
            ['^@domain'],
            // Kernel imports
            ['^@kernel'],
            // Shared imports
            ['^@shared'],
            // Main imports
            ['^@main'],
            // Outros imports com @/ que não foram capturados acima
            ['^@/'],
            // Outros imports com @ (packages scoped)
            ['^@\\w'],
            // Imports relativos parent (..)
            ['^\\.\\.(?!\\/\\.\\.\\.\\.)', '^\\.\\.\\/.+'],
            // Imports relativos current (./)
            ['^\\./'],
            // Side effect imports
            ['^\\u0000'],
            // Imports de CSS
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**/src/**'],
              message: 'Use path aliases (@/) instead of relative imports for paths going to src directory',
            },
            {
              group: ['../../**'],
              message: 'Use path aliases instead of relative imports that go more than 2 levels up (../../)',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['**/prisma/generated/**', '**/*.d.ts', 'dist/**'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  tseslint.configs.recommended.map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      '@typescript-eslint/no-namespace': 'off',
    },
  })),
]);
