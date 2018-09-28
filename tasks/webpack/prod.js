const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');

const common = require('./common');
const clientConfig = require('../babelConfig/client');


module.exports = merge(common, {
  entry: ['@babel/polyfill', './client/src/index.jsx'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: clientConfig,
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: 'sha384-9ralMzdK1QYsk4yBY680hmsb4/hJ98xK3w0TIaJ3ll4POWpWUYaA2bRjGGujGT8w',
    }),
  ],
});
