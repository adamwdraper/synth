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
    node: null,
    connections: null,
    template: template,
    bindings: {
      '[data-active]': 'isActive',
      '[data-wave]': 'wave'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();

      this.connections = [];
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);

      return this;
    },
    addConnections: function() {
      _.each(this.data.connections, function(node) {
        this.node.connect(node)
      }, this);
    },
    play: function(frequency) {
      log('play', frequency);
      
      if (this.settings.get('isActive')) {
        this.stop();

        this.node = context.createOscillator();
        this.node.type = this.settings.get('wave');
        this.node.frequency.value = frequency;
        this.addConnections();
        this.node.start(0);
      }
    },
    update: function(frequency) {
      log('update', frequency);
      this.node.frequency.value = frequency;
    },
    stop: function() {
      if (this.node) {
        this.node.stop(0);
        
        this.node = null;
      }
    }
  });

  return View;
});