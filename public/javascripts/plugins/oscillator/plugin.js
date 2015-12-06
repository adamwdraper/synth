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
    oscillator: null,
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
        this.oscillator = this.data.context.createOscillator();
        this.oscillator.type = this.settings.get('wave');
        this.oscillator.frequency.value = this.settings.get('frequency');
        this.oscillator.connect(this.data.volume);
        this.oscillator.start(0);
      }
    },
    stop: function() {
      if (this.oscillator) {
        this.oscillator.stop();
      }
      
      this.oscillator = null;
    },
    set: function(attribute, value) {
      this.settings.set(attribute, value);
    },
    setWave: function(model, type) {
      if (this.oscillator) {
        this.oscillator.type = type;
      }
    },
    setFrequency: function(model, frequency) {
      if (this.oscillator) {
        this.oscillator.frequency.value = frequency;
      }
    }
  });

  return View;
});