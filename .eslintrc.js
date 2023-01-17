module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.dto.ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '_'
      }
    ],
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'camelcase': 'warn',
    'default-case': 'warn',
    'default-param-last': 'warn',
    'eqeqeq': 'error',
    'no-console': 'warn',
    'no-empty-function': 'warn',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-shadow': 'warn',
    'no-unused-expressions': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    'sort-imports': [ 'error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': [ 'none', 'all', 'single', 'multiple' ],
      'allowSeparatedGroups': false
    } ],
    'array-bracket-spacing': [ 'error', 'always', { 'singleValue': false } ],
    'yoda' : [ 'error', 'never' ],
    'eol-last': [ 'error', 'always' ],
    'indent': [ 'error', 'tab' ],
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'quotes': [ 'error', 'single' ],
    'semi-style': [ 'error', 'last' ],
    'no-extra-semi': 'warn'
  }
};
