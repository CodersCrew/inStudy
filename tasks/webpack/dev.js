const merge = require('webpack-merge');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const analyzer = require('webpack-bundle-analyzer');

const common = require('./common');
const clientConfig = require('../babelConfig/client');

const { BundleAnalyzerPlugin } = analyzer;

module.exports = merge(common, {
  entry: ['@babel/polyfill', './client/src/index.jsx'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: clientConfig,
          },
          {
            loader: 'stylelint-custom-processor-loader',
            options: { emitWarning: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: 'local',
    }),
    new ErrorOverlayPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
});
