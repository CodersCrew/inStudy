const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    amd: true,
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    'no-console': 'off',
    'no-confusing-arrow': 'off',
    'react/destructuring-assignment': 'off',
    'object-curly-newline': 'off',
    'react/forbid-prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'implicit-arrow-linebreak': 'off',
    'consistent-return': 'off',
    'max-len': ['error', { 'code': 120 }],
  },
  settings: {
    'import/resolver': {
        webpack: {
          config: path.join(__dirname, 'client', 'webpack.common.js')
        }
      }
  }
}
