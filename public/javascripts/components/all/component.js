/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'utilities/trigger/utility',
  'plugins/synth/plugin',
  'plugins/amp-envelope/plugin',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/volume/plugin',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, trigger, Synth, AmpEnvelope, Oscilliscope, Oscillator, Volume, template) {
  var View = Backbone.View.extend({
    template: template,
    synth: null,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      trigger.connectInstrament(keyboard);
      
      this.synth = new Synth({
        el: this.$el.find('[data-synth]')
      });

      this.synth.renderModules({
        oscilliscope: Oscilliscope,
        oscillator: Oscillator,
        ampEnvelope: AmpEnvelope,
        master: Volume
      });



      // // Analyzer
      // this.initializeModule('oscilliscope', Oscilliscope);

      // // Master Volume
      // this.initializeModule('master', Volume, {
      //   connections: [
      //     this.voice.oscilliscope.node,
      //     context.destination
      //   ]
      // });

      // // Amp Envelope
      // this.initializeModule('ampEnvelope', AmpEnvelope, {
      //   connections: [
      //     this.voice.master.node
      //   ]
      // });

      // this.initializeModule('oscillator', Oscillator, {
      //   connections: [
      //     this.voice.ampEnvelope.node
      //   ]
      // });

      return this;
    }
  });

  return View;
});