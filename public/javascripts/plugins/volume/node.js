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
    listeners: {},
    events: {},
    initialize: function() {
      this.listenTo(this.settings, 'change:volume', this.updateVolume);
    },
    create: function() {
      this.node = context.createGain();

      this.updateVolume();
    },
    addConnection: function(node) {
      this.node.connect(node);
    },
    updateVolume: function() {
      this.node.gain.value = this.settings.get('volume');
    }
  });

  return View;
});