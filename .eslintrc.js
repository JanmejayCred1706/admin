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
    'react/no-unescaped-entities': 'off', // this rule eslint through a error for not using react in every react component
    '@typescript-eslint/no-explicit-any': 'error', // this rule for restrict any type in the code base
    '@next/next/no-page-custom-font': 'off', // for some custom fonts (in docs)

    // Add your custom ESLint rules here
  },
};