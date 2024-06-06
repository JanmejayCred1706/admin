module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // TypeScript rules
    'react/no-unescaped-entities': 'off', // this rule eslint through a error for not using react in every react component
    '@typescript-eslint/no-explicit-any': 'warn', // this rule for restrict any type in the code base
    '@next/next/no-page-custom-font': 'off', // for some custom fonts (in docs)
    '@typescript-eslint/explicit-function-return-type': 'off', // Off, to avoid requiring explicit return types for every function
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], //Warn for unused variables, ignoring variables prefixed with _.
    '@typescript-eslint/no-var-requires': 'error', //Error for using require statements, which should be avoided in favor of ES6 imports.
    '@typescript-eslint/explicit-module-boundary-types': 'Off', //to avoid requiring explicit return types for module boundaries.

    // React rules
    'react/react-in-jsx-scope': 'off', // this rule is warning msg when any file is not uses react import
    'react/prop-types': 'off', //Off, since TypeScript handles prop types.

    // Hooks rules
    'react-hooks/rules-of-hooks': 'error', // Error to enforce the rules of hooks.

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'off', // Off, as Next.js uses its own anchor component.

    // Import rules
    'import/no-unresolved': 'error', // Error for unresolved imports.
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],

        pathGroups: [
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'next**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '{components/**,utils/**}',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ], // Warn for import order, enforcing a specific order and newlines between groups.
    'import/newline-after-import': 'warn', // Warn for a newline after the last import statement.
    // 'import/no-default-export': 'off', // Next.js uses default exports for pages
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    // Add your custom ESLint rules here
  },
};