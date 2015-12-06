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
      this.listenTo(this.settings, 'change:wave', this.updateWave);
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
        this.oscillator.frequency.value = 1000;
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
    updateWave: function(model, value) {
      if (this.oscillator) {
        this.oscillator.type = value;
      }

      log(value);
    }
  });

  return View;
});