/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/frequency-slider/plugin',
  'plugins/volume/plugin',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Oscilliscope, Oscillator, Frequency, Volume, Settings, template) {
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

      this.$modules = this.$el.find('[data-modules]');

      this.initializeModules();

      this.renderModules();

      return this;
    },
    initializeModules: function() {
      var oscillatorCount = 2;

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

      // Frequency Slider
      this.plugins.frequency = new Frequency({
        max: 4000,
        min: 0
      });
      this.listenTo(this.plugins.frequency.settings, 'change:frequency', this.setOscillatorFrequency);
    },
    renderModules: function() {
      this.$modules.append(this.plugins.oscilliscope.render().$el);

      _.each(this.oscillators, function(oscillator) {
        this.$modules.append(oscillator.render().$el);
      }, this);
      
      this.$modules.append(this.plugins.master.render().$el);

      this.$modules.append(this.plugins.frequency.render().$el);
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