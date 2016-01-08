define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'utilities/synth/utility',
  'plugins/amp-envelope/plugin',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, synth, AmpEnvelope, Oscilliscope, Oscillator, template) {
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

      synth.setModules([
        {
          id: 'oscillator',
          view: Oscillator, 
          connections: [
            'ampEnvelope'
          ]
        },
        {
          id: 'ampEnvelope',
          view: AmpEnvelope
        }
      ]);

      synth.setInstrament(keyboard);

      synth.start();

      return this;
    }
  });

  return View;
});