/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility'
], function($, _, Backbone, context) {
  var View = Backbone.View.extend({
    bindings: {},
    listeners: {
      'note:on': 'attack',
      'note:off': 'release'
    },
    events: {},
    initialize: function() {},
    attack: function() {
      log('attack');
      var now = context.currentTime;

      this.data.param.cancelScheduledValues(now);

      this.data.param.setValueAtTime(0, now);

      // attack
      this.data.param.linearRampToValueAtTime(1.0, now + this.settings.get('attack'));

      // decay to sustain
      this.data.param.linearRampToValueAtTime(this.settings.get('sustain'), now + this.settings.get('attack') + this.settings.get('decay'));
    },
    release: function() {
      log('release');
      var now = context.currentTime;

      this.data.param.cancelScheduledValues(now);

      // release
      this.data.param.linearRampToValueAtTime(0, now + this.settings.get('release'));
    }
  });

  return View;
});