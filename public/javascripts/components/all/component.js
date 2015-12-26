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
  'plugins/amp-envelope/plugin',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/volume/plugin',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, trigger, AmpEnvelope, Oscilliscope, Oscillator, Volume, template) {
  var View = Backbone.View.extend({
    template: template,
    instrument: null,
    voice: {},
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

      // Analyzer
      this.initializeModule('oscilliscope', Oscilliscope);

      // Master Volume
      this.initializeModule('master', Volume, {
        connections: [
          this.voice.oscilliscope.node,
          context.destination
        ]
      });

      // Amp Envelope
      this.initializeModule('ampEnvelope', AmpEnvelope, {
        connections: [
          this.voice.master.node
        ]
      });

      this.initializeModule('oscillator', Oscillator, {
        connections: [
          this.voice.ampEnvelope.node
        ]
      });

      trigger.connectInstrament(keyboard);

      this.renderAll();

      return this;
    },
    initializeModule: function(name, View, options) {
      var view;

      options = options || {};

      view = new View(options);

      this.voice[name] = view;

      return view;
    },
    renderAll: function() {
      _.each(this.voice, function(module) {
        this.$modules.append(module.render().$el);
      }, this);
    }
  });

  return View;
});