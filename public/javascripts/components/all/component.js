/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  './states',
  'template!./template.html'
], function($, _, Backbone, States, template) {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var masterVolume = context.createGain();
  var oscillator;

  var View = Backbone.View.extend({
    template: template,
    bindings: {
      '[data-play]': 'isPlaying'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.states = new States();
      this.listenTo(this.states, 'change:isPlaying', this.play);

      masterVolume.connect(context.destination);
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.states);

      return this;
    },
    play: function(model, value) {
      if (value) {
        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 1000; // value in hertz
        oscillator.connect(masterVolume);

        oscillator.start(0);
      } else {
        oscillator.stop();
      }

      log(value);
    }
  });

  return View;
});