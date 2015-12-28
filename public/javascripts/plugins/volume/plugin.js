/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  './settings',
  './node',
  'template!./template.html'
], function($, _, Backbone, context, Settings, Node, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    template: template,
    bindings: {
      '[data-volume]': 'volume'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();

      Node.prototype.settings = this.settings;

      this.node = Node;
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);
      
      return this;
    }
  });

  return View;
});