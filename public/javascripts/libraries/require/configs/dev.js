 /*
 * Dev Config Settings
 */
requirejs.config({
    waitSeconds: 0,
    baseUrl: 'javascripts',
    config: {
        'appular': {
            'env': 'dev'
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