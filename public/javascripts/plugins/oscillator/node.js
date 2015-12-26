/**
 * @appular oscillator
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
      'note:on': 'play'
    },
    events: {},
    initialize: function() {},
    create: function() {
      this.node = context.createOscillator();
    },
    addConnection: function(node) {
      this.node.connect(node);
    },
    play: function(note) {
      if (this.settings.get('isActive')) {
        this.node.type = this.settings.get('wave');
        this.node.frequency.value = note.frequency;
        this.node.start(0);
      }
    },
    stop: function() {
      if (this.node) {
        this.node.stop(0);
        
        delete this.node;
      }
    }
  });

  return View;
});