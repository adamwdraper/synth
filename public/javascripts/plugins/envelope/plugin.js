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
  'template!./template.html'
], function($, _, Backbone, context, trigger, Settings, template) {
  var View = Backbone.View.extend({
    node: null,
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

      this.listenTo(trigger, 'note:on', this.attack);
      this.listenTo(trigger, 'note:off', this.release);
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);
      
      return this;
    },
    attack: function() {
      var now = context.currentTime;

      this.data.param.cancelScheduledValues(now);

      this.data.param.setValueAtTime(0, now);

      // attack
      this.data.param.linearRampToValueAtTime(1.0, now + this.settings.get('attack'));

      // decay to sustain
      this.data.param.linearRampToValueAtTime(this.settings.get('sustain'), now + this.settings.get('attack') + this.settings.get('decay'));
    },
    release: function() {
      var now = context.currentTime;

      this.data.param.cancelScheduledValues(now);

      // release
      this.data.param.linearRampToValueAtTime(0, now + this.settings.get('release'));
    },
    formatValue: function(value) {
      return Number(value);
    }
  });

  return View;
});