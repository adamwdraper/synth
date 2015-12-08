/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/keyboard/utility',
  'utilities/midi/utility',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/volume/plugin',
  'template!./template.html'
], function($, _, Backbone, keyboard, midi, Oscilliscope, Oscillator, Volume, template) {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var View = Backbone.View.extend({
    template: template,
    oscillators: [],
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      this.listenTo(keyboard, 'note:start', this.playOscillators);
      this.listenTo(keyboard, 'note:stop', this.stopOscillators);
    },
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

      this.initializeModules();

      this.renderModules();

      return this;
    },
    initializeModules: function() {
      var oscillatorCount = 1;

      // Analyzer
      this.plugins.oscilliscope = new Oscilliscope({
        context: context
      });

      // Master Volume
      this.plugins.master = new Volume({
        context: context,
        connections: [
          this.plugins.oscilliscope.node,
          context.destination
        ]
      });

      // Add Oscillators
      while (this.oscillators.length < oscillatorCount) {
        var oscillator = new Oscillator({
          context: context,
          connections: [
            this.plugins.master.node
          ]
        });

        this.oscillators.push(oscillator);
      }
    },
    renderModules: function() {
      this.$modules.append(this.plugins.oscilliscope.render().$el);

      _.each(this.oscillators, function(oscillator) {
        this.$modules.append(oscillator.render().$el);
      }, this);
      
      this.$modules.append(this.plugins.master.render().$el);
    },
    stopOscillators: function() {
      _.each(this.oscillators, function(oscillator) {
        oscillator.stop();
      });
    },
    playOscillators: function(note) {
      _.each(this.oscillators, function(oscillator) {
        oscillator.set('frequency', midi.noteNumberToFrequency(note.data[1]));
        oscillator.play();
      });
    }
  });

  return View;
});