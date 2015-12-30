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

      this.env = new this.envelope({
        param: this.node.gain
      });
    },
    addConnection: function(node) {
      this.node.connect(node);
    },
    attack: function(note) {
      this.env.trigger('note:on', note);
    },
    release: function(note) {
      this.env.trigger('note:off', note);
    }
  });

  return View;
});