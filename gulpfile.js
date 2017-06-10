var gulp = require('gulp'),
  sass = require('gulp-sass'),
  webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      port: 8080,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

/*Watch for changes in sass*/
gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('serve', ['webserver','sass','watch']);