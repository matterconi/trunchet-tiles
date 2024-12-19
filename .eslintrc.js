module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended', // For TypeScript
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser', // For TypeScript
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error', // Shows Prettier errors as ESLint errors
      'indent': ['error', 2], // Enforce 2 spaces indentation
    },
  };
  