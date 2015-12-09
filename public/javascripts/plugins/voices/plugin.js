/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, template) {
  var View = Backbone.View.extend({
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      // this.listenTo(keyboard, 'note:start', this.playOscillators);
      // this.listenTo(keyboard, 'note:stop', this.stopOscillators);
    },
    render: function() {
      this.$el.html(this.template());
      
      return this;
    }
  });

  return View;
});