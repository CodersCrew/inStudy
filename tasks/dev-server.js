/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack/dev');

module.exports = () => {
  const compiler = webpack(config);

  new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, '..', 'public'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/auth/google': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
    },
  }).listen(3000, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:3000');
  });
};
