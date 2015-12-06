/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'plugins/oscillator/plugin',
  'plugins/frequency-slider/plugin',
  'plugins/volume/plugin',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Oscillator, Frequency, Volume, Settings, template) {
  var context = new (window.AudioContext || window.webkitAudioContext)();

  var View = Backbone.View.extend({
    template: template,
    oscillators: [],
    bindings: {},
    listeners: {},
    events: {
      'click [data-play]': 'togglePlaying'
    },
    initialize: function() {
      this.settings = new Settings();
      this.listenTo(this.settings, 'change:isPlaying', this.updatePlaying);
    },
    render: function() {
      this.$el.html(this.template());

      this.plugins.master = new Volume({
        el: this.$el.find('[data-master]'),
        context: context
      }).render();

      this.plugins.frequency = new Frequency({
        el: this.$el.find('[data-frequency]')
      }).render();
      this.listenTo(this.plugins.frequency.settings, 'change:frequency', this.setOscillatorFrequency);

      // render all oscillators
      _.each(this.$el.find('[data-oscillator]'), function($oscillator) {
        var oscillator = new Oscillator({
          el: $oscillator,
          context: context,
          volume: this.plugins.master.volume
        }).render();

        this.oscillators.push(oscillator);
      }, this);

      return this;
    },
    togglePlaying: function() {
      this.settings.toggle('isPlaying');
    },
    updatePlaying: function() {
      if (this.settings.get('isPlaying')) {
        _.each(this.oscillators, function(oscillator) {
          oscillator.play();
        });
      } else {
        _.each(this.oscillators, function(oscillator) {
          oscillator.stop();
        });
      }
    },
    setOscillatorFrequency: function(model, frequency) {
      _.each(this.oscillators, function(oscillator) {
        oscillator.set('frequency', frequency);
      });
    }
  });

  return View;
});