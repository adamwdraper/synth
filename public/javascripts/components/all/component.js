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
    bindings: {},
    listeners: {},
    events: {
      'click [data-start-stop]': 'toggleStartStop'
    },
    initialize: function() {},
    render: function() {
      this.states = new States();
      this.listenTo(this.states, 'change:isPlaying', this.log);

      // create Oscillator node
      oscillator.type = 'sine';
      oscillator.frequency.value = 2000; // value in hertz

      // connect oscillator to gain node to speakers
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      this.$el.html(this.template());

      return this;
    },
    toggleStartStop: function() {
      this.states.toggle('isPlaying');
    },
    log: function(model, value) {
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