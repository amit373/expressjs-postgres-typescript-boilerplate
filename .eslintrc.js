module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    semi: [1, 'always'],
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'space-before-function-paren': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/explicit-function-return-type': 1
  }
};
