var fs = require('fs');
var packageJSON  = require('./package');
var gulp = require('gulp');
var requirejs = require('requirejs');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jshintConfig = packageJSON.jshintConfig;
var sourceMaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var karma = require('karma');
var nodemon = require('gulp-nodemon');
var rev = require('gulp-rev');
var del = require('del');

var requirejsConfig = {
  baseUrl: './src/javascripts',
  dir: './dist/javascripts',
  paths: {
    'appular': 'libraries/appular/appular',
    'backbone': 'libraries/backbone/backbone',
    'backboneStickit': 'libraries/backbone/extensions/stickit',
    'domReady': 'libraries/require/plugins/domReady',
    'jquery': 'empty:',
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
        'components/all/component',
        'routers/default/router'
      ],
      exclude: [
        'libraries/require/require'
      ]
    }
  ]
};

jshintConfig.lookup = false;


// Empty directories
gulp.task('clean', function() {
  return del([
    './dist/*'
  ]);
});

// Compile sass
gulp.task('sass', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./src/stylesheets'));
});

gulp.task('sass:dist', [
    'clean'
  ], function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./dist/stylesheets'));
});

// Watch for compiling sass
gulp.task('sass:watch', [
  'sass'
  ], function() {
  gulp.watch('./src/sass/**/*.scss', [
    'sass'
  ]);
});

// Lint javascript
gulp.task('lint', function() {
  return gulp.src([
      './src/javascripts/routers/**/*.js',
      './src/javascripts/components/**/*.js',
      './src/javascripts/plugins/**/*.js',
      './src/javascripts/utilities/**/*.js'
    ])
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// Build javascript with r.js
gulp.task('javascript:dist', [
    'clean'
  ], function(done) {
  requirejs.optimize(requirejsConfig, function(buildResponse) {
    done();
  }, done);
});

// Run karma tests
gulp.task('test', [
    'lint'
  ], function (done) {
  new karma.Server({
    configFile: __dirname + '/src/javascripts/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:travis', [
    'lint'
  ], function (done) {
  new karma.Server({
    configFile: __dirname + '/src/javascripts/karma-travis.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:tdd', function (done) {
  new karma.Server({
    configFile: __dirname + '/src/javascripts/karma.conf.js'
  }, done).start();
});

// Start Server
gulp.task('develop', function () {
  nodemon({
    script: './bin/www',
    watch: [
      '/app.js',
      '/config/**/*',
      '/routes/**/*',
      '/views/**/*'
    ],
    ext: 'js jade',
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('production', function () {
  nodemon({
    script: './bin/www',
    env: {
      'NODE_ENV': 'production'
    }
  });
});

// Version assets
gulp.task('version', [
    'javascript:dist',
    'sass:dist'
  ], function () {
  return gulp.src([
      './dist/stylesheets/*.css',
      './dist/images/**/*',
      './dist/javascripts/libraries/require/require.js',
      './dist/javascripts/libraries/require/configs/build.js'
    ], {
      base: './dist'
    })
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./config'));
});

// Task groups
gulp.task('build', [
  'javascript:dist',
  'sass:dist',
  'version'
]);

gulp.task('default', [
  'develop',
  'sass:watch'
]);

gulp.task('travis', [
  'test:travis',
  'build'
]);