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
    node: null,
    bindings: {},
    listeners: {
      'note:on': 'attack',
      'note:off': 'release'
    },
    events: {},
    initialize: function() {},
    create: function() {
      this.node = context.createGain();
    },
    addConnection: function(node) {
      this.node.connect(node);
    },
    attack: function() {
      log('attack');
      var now = context.currentTime;

      this.node.gain.cancelScheduledValues(now);

      this.node.gain.setValueAtTime(0, now);

      // attack
      this.node.gain.linearRampToValueAtTime(1.0, now + this.settings.get('attack'));

      // decay to sustain
      this.node.gain.linearRampToValueAtTime(this.settings.get('sustain'), now + this.settings.get('attack') + this.settings.get('decay'));
    },
    release: function() {
      log('release');
      var now = context.currentTime;

      this.node.gain.cancelScheduledValues(now);

      // release
      this.node.gain.linearRampToValueAtTime(0, now + this.settings.get('release'));
    }
  });

  return View;
});