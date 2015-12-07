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
    node: null,
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
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);

      return this;
    },
    play: function() {
      if (this.settings.get('isActive')) {
        this.node = this.data.context.createOscillator();
        this.node.type = this.settings.get('wave');
        this.node.frequency.value = this.settings.get('frequency');
        this.node.connect(this.data.volume);
        this.node.start(0);
      }
    },
    stop: function() {
      if (this.node) {
        this.node.stop();
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