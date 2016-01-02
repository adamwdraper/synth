define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility'
], function($, _, Backbone, context) {
  var View = Backbone.View.extend({
    node: null,
    decayTimeout: null,
    bindings: {},
    listeners: {
      'note:on': 'attack',
      'note:off': 'release'
    },
    events: {},
    initialize: function() {
      _.bindAll(this, 'decay');
    },
    create: function() {
      this.node = context.createGain();

      this.node.gain.setValueAtTime(0, context.currentTime);
    },
    addConnection: function(node) {
      this.node.connect(node);
    },
    attack: function() {
      var now = context.currentTime;
      var attack = this.settings.get('attack');

      log('attack', attack);

      // attack
      this.node.gain.linearRampToValueAtTime(1.0, now + attack);
            
      this.decayTimeout = setTimeout(this.decay, attack * 1000);
    },
    decay: function() {
      var now = context.currentTime;
      var decay = this.settings.get('decay');

      log('decay', decay, 'to', this.settings.get('sustain'));

      // decay to sustain
      this.node.gain.linearRampToValueAtTime(this.settings.get('sustain'), now + decay);
    },
    release: function() {
      var now = context.currentTime;
      var release = this.settings.get('release');

      clearTimeout(this.decayTimeout);

      log('release', release);

      this.node.gain.cancelScheduledValues(now);

      // release
      this.node.gain.linearRampToValueAtTime(0, now + this.settings.get('release'));
    }
  });

  return View;
});