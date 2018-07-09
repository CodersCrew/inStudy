const path = require('path');
const merge = require('webpack-merge');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const common = require('./webpack.common.js');
const analyzer = require('webpack-bundle-analyzer');

const { BundleAnalyzerPlugin } = analyzer;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: 'local',
    }),
    new ErrorOverlayPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/auth/google': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
    },
  },
});
