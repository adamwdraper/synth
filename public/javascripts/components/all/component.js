define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'utilities/trigger/utility',
  'utilities/synth/utility',
  'plugins/amp-envelope/plugin',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/volume/plugin',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, trigger, synth, AmpEnvelope, Oscilliscope, Oscillator, Volume, template) {
  var View = Backbone.View.extend({
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      this.$el.find('[data-synth]').append(synth.$el);

      // Analyzer
      // this.renderModule('oscilliscope', Oscilliscope);

      synth.renderModule('oscillator', Oscillator, [
        'ampEnvelope'
      ]);

      // Amp Envelope
      synth.renderModule('ampEnvelope', AmpEnvelope, [
        'master'
      ]);

      // Master Volume
      synth.renderModule('master', Volume, [
        context.destination
      ]);

      trigger.connectInstrament(keyboard);

      return this;
    }
  });

  return View;
});