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
    className: 'ui-module',
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
      _.extend({
        max: 3000,
        min: 0,
        step: 100
      }, this.data);

      this.$el.html(this.template({
        max: this.data.max || 3000,
        min: this.data.min || 0,
        step: this.data.step || 100
      }));

      this.settings.set('frequency', Math.floor((this.data.max - this.data.min)/2));

      this.stickit(this.settings);
      
      return this;
    }
  });

  return View;
});