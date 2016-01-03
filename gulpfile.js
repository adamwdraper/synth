var gulp = require('gulp');
var packageJSON  = require('./package');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jshintConfig = packageJSON.jshintConfig;
var sourceMaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');

jshintConfig.lookup = false;

gulp.src('yo').pipe(jshint(jshintConfig));

gulp.task('default', [
  'sass:watch'
]);

gulp.task('sass', function() {
  gulp.src('./public/sass/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(sourceMaps.write('.'))
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

