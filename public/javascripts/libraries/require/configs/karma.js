/*
 * Test Config Settings
 */
var allTestFiles = [];
var TESTS_REGEXP = /tests\.js$/
var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TESTS_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

requirejs.config({
  waitSeconds: 0,
  baseUrl: '/base',
  config: {
    'appular': {
      env: 'test',
      useFixtures: true
    }
  },
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
  deps: [
    'appular',
    'backboneStickit',
    'jqueryFunctions',
    'log',
    'underscoreTemplate'
  ].concat(allTestFiles),
  callback: window.__karma__.start
});