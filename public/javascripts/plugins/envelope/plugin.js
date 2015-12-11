/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Settings, template) {
  var View = Backbone.View.extend({
    node: null,
    template: template,
    bindings: {
      '[data-attack]': 'attack',
      '[data-decay]': 'decay',
      '[data-sustain]': 'sustain',
      '[data-release]': 'release'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);
      
      return this;
    },
    updateProperty: function(value) {
      this.node.value = value;
    }
  });

  return View;
});