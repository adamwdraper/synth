/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'plugins/envelope/plugin',
  'template!./template.html'
], function($, _, Backbone, context, Envelope, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    node: null,
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      this.node = context.createGain();
    },
    render: function() {
      this.$el.html(this.template());

      this.plugins.envelope = new Envelope({
        el: this.$el.find('[data-envelope]'),
        param: this.node.gain
      }).render();
      
      return this;
    }
  });

  return View;
});