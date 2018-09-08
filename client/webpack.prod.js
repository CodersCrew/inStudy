const merge = require('webpack-merge');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: 'sha384-9ralMzdK1QYsk4yBY680hmsb4/hJ98xK3w0TIaJ3ll4POWpWUYaA2bRjGGujGT8w',
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
      },
    ]),
  ],
});
