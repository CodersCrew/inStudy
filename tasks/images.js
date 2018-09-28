const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = () =>
  gulp.src('client/public/**/*.{jpg,jpeg,svg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('public'));
