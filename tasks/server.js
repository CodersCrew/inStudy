/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const babel = require('gulp-babel');

const config = require('./babelConfig/server');

module.exports = () => gulp.src('server/**/*.js')
  .pipe(babel(config))
  .pipe(gulp.dest('dist'));
