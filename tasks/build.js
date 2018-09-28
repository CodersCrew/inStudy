const gulp = require('gulp');
const webpack = require('webpack-stream');
const config = require('./webpack/prod');

module.exports = () => {
  process.env.NODE_ENV = 'production';

  return gulp.src('client/src/index.jsx')
    .pipe(webpack(config))
    .pipe(gulp.dest('public'));
};
