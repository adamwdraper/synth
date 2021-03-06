/*
 * Prod Config Settings
 */
requirejs.config({
  waitSeconds: 0,
  baseUrl: 'javascripts/build',
  config: {
    'appular': {
      'env': 'prod'
    }
  },
  paths: {
    'jquery': [
      '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
      'libraries/jquery/jquery'
    ]
  },
  shim: {},
  deps: [
    'backboneStickit',
    'jqueryFunctions',
    'log',
    'underscoreTemplate'
  ],
  callback: function() {
    require([
      'appular'
    ], function(Appular) {
      Appular.render();
    });
  }
});