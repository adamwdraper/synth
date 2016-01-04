var fs = require('fs');
var packageJSON  = require('./package');
var gulp = require('gulp');
var requirejs = require('requirejs');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jshintConfig = packageJSON.jshintConfig;
var sourceMaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');

var requirejsConfig = {
  baseUrl: './public/javascripts',
  dir: './public/javascripts/build',
  paths: {
    'appular': 'libraries/appular/appular',
    'backbone': 'libraries/backbone/backbone',
    'backboneStickit': 'libraries/backbone/extensions/stickit',
    'domReady': 'libraries/require/plugins/domReady',
    'jquery': 'libraries/jquery/jquery',
    'jqueryFunctions': 'libraries/jquery/extensions/functions',
    'log': 'libraries/log/log',
    'template': 'libraries/require/plugins/template',
    'text': 'libraries/require/plugins/text',
    'underscore': 'libraries/underscore/underscore',
    'underscoreTemplate': 'libraries/underscore/extensions/template'
  },
  modules: [
    {
      name: 'libraries/require/require',
      include: [
        'appular',
        'backbone',
        'backboneStickit',
        'domReady',
        'jqueryFunctions',
        'log',
        'template',
        'text',
        'underscore',
        'underscoreTemplate'
      ]
    },
    {
      name: 'libraries/require/configs/build',
      include: [
        'utilities/context/utility',
        'utilities/keyboard/utility',
        'utilities/midi/utility',
        'utilities/trigger/utility',
        'plugins/amp-envelope/plugin',
        'plugins/oscillator/plugin',
        'plugins/oscilliscope/plugin',
        'plugins/voices/plugin',
        'plugins/volume/plugin',
        'components/all/component'
      ],
      exclude: [
        'libraries/require/require'
      ]
    }
  ]
};

jshintConfig.lookup = false;

// Compile sass
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

// Watch for compiling sass
gulp.task('sass:watch', function() {
  gulp.watch('./public/sass/**/*.scss', [
    'sass'
  ]);
});

// Lint javascript
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

// Build javascript with r.js
gulp.task('require:build', function(cb){
  requirejs.optimize(requirejsConfig, function(buildResponse) {
    cb();
  }, cb);
});

// Task groups
gulp.task('build', [
  'lint',
  'require:build',
  'sass'
]);

gulp.task('default', [
  'sass:watch'
]);