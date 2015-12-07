var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function () {
  gulp.src('./public/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', [
    'sass'
  ]);
});