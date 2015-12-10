/**
 * @appular oscillator
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  './settings',
  'template!./template.html'
], function($, _, Backbone, context, Settings, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    template: template,
    bindings: {
      '[data-active]': 'isActive',
      '[data-wave]': 'wave'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();

      this.nodes = {};
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);

      return this;
    },
    addConnections: function(node) {
      _.each(this.data.connections, function(connection) {
        node.connect(connection);
      }, this);
    },
    play: function(frequency) {
      var node;

      if (this.settings.get('isActive')) {
        this.stop(frequency);

        node = context.createOscillator();
        node.type = this.settings.get('wave');
        node.frequency.value = frequency;
        this.addConnections(node);
        node.start(0);

        this.nodes[frequency] = node;

        log('oscillator', 'play', node, this.nodes);
      }
    },
    stop: function(frequency) {
      var node = this.nodes[frequency];
      
      if (node) {
        node.stop(0);
        
        delete this.nodes[frequency];

        log('oscillator', 'stop', node, this.nodes);
      }
    }
  });

  return View;
});