module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
