/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'plugins/envelope/plugin',
  './node',
  'template!./template.html'
], function($, _, Backbone, context, Envelope, Node, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    node: null,
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      this.node = Node;
    },
    render: function() {
      this.$el.html(this.template());

      this.plugins.envelope = new Envelope({
        el: this.$el.find('[data-envelope]')
      }).render();

      Node.prototype.envelope = this.plugins.envelope.envelope;
      
      return this;
    }
  });

  return View;
});