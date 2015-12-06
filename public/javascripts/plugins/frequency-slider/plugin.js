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
    template: template,
    bindings: {
      '[data-frequency]': 'frequency'
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
    }
  });

  return View;
});