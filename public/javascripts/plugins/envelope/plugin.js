/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/trigger/utility',
  './settings',
  './envelope',
  'template!./template.html'
], function($, _, Backbone, context, trigger, Settings, Envelope, template) {
  var View = Backbone.View.extend({
    envelope: null,
    template: template,
    bindings: {
      '[data-attack]': {
        observe: 'attack',
        onSet: 'formatValue'
      },
      '[data-decay]': {
        observe: 'decay',
        onSet: 'formatValue'
      },
      '[data-sustain]': {
        observe: 'sustain',
        onSet: 'formatValue'
      },
      '[data-release]': {
        observe: 'release',
        onSet: 'formatValue'
      }
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();

      Envelope.prototype.settings = this.settings;

      this.envelope = Envelope;
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);
      
      return this;
    },
    formatValue: function(value) {
      return Number(value);
    }
  });

  return View;
});