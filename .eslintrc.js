module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'never'],
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [2, { extensions: ['js', 'jsx'] }],
    'react/prefer-stateless-function': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-extraneous-denpendencies': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 'off',
    indent: 0,
    'jsx-ally/anchor-is-valid': 0,
    'no-nested-ternary': 0,
    'import/no-cycle': [0, { ignoreExternal: true }],
    'no-alert': 0,
    'max-len': 0,
    'no-use-before-define': 0,
    camelcase: [0, { properties: 'never' }],
    'linebreak-style': [0, 'error', 'windows'],
    'no-unsafe-optional-chaining': 'error',
    'react/no-danger': 0,
    'react/function-component-definition': [
      2,
      { namedComponents: 'function-declaration' },
    ],
    'react/no-unstable-nested-components': [
      'off',
      { allowAsProps: false },
    ],
    'no-shadow': [0, { builtinGlobals: false, hoist: 'functions', allow: [] }],
    'no-unused-vars': 0,

    'react/jsx-indent': 0,

     'react/jsx-indent-props': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
