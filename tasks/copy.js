const gulp = require('gulp');
const gulpCopy = require('gulp-copy');

const sourceFiles = [];
const destination = 'dest/';

return gulp.src('client/public/**/*.{js,json,ico,mp4,pdf}')
  .pipe(gulpCopy(outputPath, options))
  .pipe(gulp.dest('public'));
