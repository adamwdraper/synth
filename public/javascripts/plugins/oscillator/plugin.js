/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Settings, template) {
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
      this.listenTo(this.settings, 'change:wave', this.setWave);
      this.listenTo(this.settings, 'change:frequency', this.setFrequency);

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
    play: function() {
      if (this.settings.get('isActive')) {
        this.node = this.data.context.createOscillator();
        this.node.type = this.settings.get('wave');
        this.node.frequency.value = this.settings.get('frequency');
        this.addConnections();
        this.node.start(0);
      }
    },
    stop: function() {
      if (this.node) {
        this.node.stop(0);
      }
      
      this.node = null;
    },
    set: function(attribute, value) {
      this.settings.set(attribute, value);
    },
    setWave: function(model, type) {
      if (this.node) {
        this.node.type = type;
      }
    },
    setFrequency: function(model, frequency) {
      if (this.node) {
        this.node.frequency.value = frequency;
      }
    }
  });

  return View;
});