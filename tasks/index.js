/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const gprint = require('gulp-print').default;
const del = require('del');
const vinylPaths = require('vinyl-paths');


const styles = require('./styles');
const server = require('./server');
const build = require('./build');
const devServer = require('./dev-server');

gulp.task('clean-client', (done) => {
  gulp.src('public')
    .pipe(gprint())
    .pipe(vinylPaths(paths => del(paths)));
  done();
});

gulp.task('clean-server', (done) => {
  gulp.src('dist')
    .pipe(gprint())
    .pipe(vinylPaths(paths => del(paths)));
  done();
});

gulp.task('styles', styles);

gulp.task('webpack-build', build);

gulp.task('webpack-dev-server', devServer);

gulp.task('server', server);

gulp.task('client', gulp.series('styles', 'webpack-dev-server'));

// gulp.task('build-client', gulp.series('styles', 'webpack-build'));

// gulp.task('build', gulp.series(gulp.parallel('clean-client', 'clean-server'), gulp.parallel('client, server')));
