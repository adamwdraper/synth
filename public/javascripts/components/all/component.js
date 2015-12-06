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
  var oscillator = context.createOscillator();
  var gainNode = context.createGain();

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

      // create Oscillator node
      oscillator.type = 'sine';
      oscillator.frequency.value = 1000; // value in hertz

      // connect oscillator to gain node to speakers
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.states);

      return this;
    },
    play: function(model, value) {
      if (value) {
        oscillator.start(0);
      } else {
        oscillator.stop();
      }

      log(value);
    }
  });

  return View;
});