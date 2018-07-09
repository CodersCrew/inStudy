const merge = require('webpack-merge');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: 'local',
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
      },
    ]),
  ],
});
