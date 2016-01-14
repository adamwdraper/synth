define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/synth/utility',
  'plugins/keyboard/plugin',
  'plugins/amp-envelope/plugin',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'template!./template.html'
], function($, _, Backbone, context, synth, Keyboard, AmpEnvelope, Oscilliscope, Oscillator, template) {
  var View = Backbone.View.extend({
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      this.$el.find('[data-synth]').append(synth.$el);

      synth.start({
        analyser: Oscilliscope,
        modules: [
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
        ],
        instrament: Keyboard
      });

      return this;
    }
  });

  return View;
});