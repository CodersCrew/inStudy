/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');
const merge = require('merge-stream');

module.exports = () => {
  const scssStream = gulp.src('client/src/styles/main.scss')
    .pipe(sass({
      includePaths: [path.resolve(__dirname, '..', 'client', 'node_modules')],
    }).on('error', sass.logError))
    .pipe(concat('scss-files.scss'));

  const lessStream = gulp.src('client/src/styles/main.less')
    .pipe(less({ javascriptEnabled: true, paths: [path.resolve(__dirname, '..', 'client', 'node_modules')] }))
    .pipe(concat('less-files.less'));

  const mergedStream = merge(lessStream, scssStream)
    .pipe(concat('styles.css'))
    .pipe(minify())
    .pipe(gulp.dest('public'));

  return mergedStream;
};
