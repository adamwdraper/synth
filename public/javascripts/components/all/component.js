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
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var masterVolume = context.createGain();
  var oscillator;

  var View = Backbone.View.extend({
    template: template,
    bindings: {
      '[data-play]': 'isPlaying',
      '[data-wave]': 'wave',
      '[data-volume]': 'volume'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();
      this.listenTo(this.settings, 'change:isPlaying', this.updatePlay);
      this.listenTo(this.settings, 'change:wave', this.updateWave);
      this.listenTo(this.settings, 'change:volume', this.updateVolume);

      masterVolume.connect(context.destination);
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);

      return this;
    },
    updatePlay: function(model, value) {
      if (value) {
        oscillator = context.createOscillator();
        oscillator.type = this.settings.get('wave');
        oscillator.frequency.value = 1000; // value in hertz
        oscillator.connect(masterVolume);

        oscillator.start(0);
      } else {
        oscillator.stop();
      }

      log(value);
    },
    updateWave: function(model, value) {
      oscillator.type = value;

      log(value);
    },
    updateVolume: function(model, value) {
      masterVolume.gain.value = value;

      log(value);
    }
  });

  return View;
});