var gulp = require('gulp');
var packageJSON  = require('./package');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jshintConfig = packageJSON.jshintConfig;

jshintConfig.lookup = false;

gulp.src('yo').pipe(jshint(jshintConfig));

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function() {
  gulp.src('./public/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('lint', function() {
  return gulp.src([
      './public/javascripts/routers/**/*.js',
      './public/javascripts/components/**/*.js',
      './public/javascripts/plugins/**/*.js',
      './public/javascripts/utilities/**/*.js'
    ])
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build', [
    'lint',
    'sass'
]);

gulp.task('sass:watch', function() {
  gulp.watch('./public/sass/**/*.scss', [
    'sass'
  ]);
});

