/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'plugins/oscillator/plugin',
  'plugins/volume/plugin',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Oscillator, Volume, Settings, template) {
  var context = new (window.AudioContext || window.webkitAudioContext)();

  var View = Backbone.View.extend({
    template: template,
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

      this.plugins.oscillator = new Oscillator({
        el: this.$el.find('[data-oscillator]'),
        context: context,
        volume: this.plugins.master.volume
      }).render();

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
    }
  });

  return View;
});