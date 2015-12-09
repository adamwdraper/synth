/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'template!./template.html'
], function($, _, Backbone, template) {
  var View = Backbone.View.extend({
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.listenTo(this.data.input, 'note:start', this.startNote);
      this.listenTo(this.data.input, 'note:stop', this.stopNote);
      // this.$el.html(this.template());
      
      return this;
    },
    startNote: function(note) {
      this.stopNote();

      this.trigger('note:start', note);
    },
    stopNote: function(note) {
      this.trigger('note:stop', note);
    }
  });

  return View;
});