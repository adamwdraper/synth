/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'plugins/oscillator/plugin',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Oscillator, Settings, template) {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var masterVolume = context.createGain();

  var View = Backbone.View.extend({
    template: template,
    bindings: {
      '[data-volume]': 'volume'
    },
    listeners: {},
    events: {
      'click [data-play]': 'togglePlaying'
    },
    initialize: function() {
      this.settings = new Settings();
      this.listenTo(this.settings, 'change:isPlaying', this.updatePlaying);
      this.listenTo(this.settings, 'change:volume', this.updateVolume);

      masterVolume.connect(context.destination);
    },
    render: function() {
      this.$el.html(this.template());

      this.plugins.oscillator = new Oscillator({
        el: this.$el.find('[data-oscillator]'),
        context: context,
        volume: masterVolume
      }).render();

      this.stickit(this.settings);

      return this;
    },
    togglePlaying: function() {
      this.settings.toggle('isPlaying');
    },
    updatePlaying: function() {
      if (this.settings.get('isPlaying')) {
        this.plugins.oscillator.play();
      } else {
        this.plugins.oscillator.stop();
      }
    },
    updatePlay: function(model, value) {
      if (value) {
        oscillator = context.createOscillator();
        oscillator.type = this.settings.get('wave');
        oscillator.frequency.value = 1000;
        oscillator.connect(masterVolume);

        oscillator.start(0);
      } else {
        oscillator.stop();
      }

      log(value);
    },
    updateVolume: function(model, value) {
      masterVolume.gain.value = value;

      log(value);
    }
  });

  return View;
});