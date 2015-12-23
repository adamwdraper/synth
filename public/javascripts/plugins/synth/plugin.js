define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var View = Backbone.View.extend({
    modules: null,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      _.bindAll(this, 'renderModule');

      this.modules = {};
    },
    render: function() {
      return this;
    },
    renderModules: function(modules) {
      _.each(modules, this.renderModule);
    },
    renderModule: function(View, name) {
      var view = new View().render();

      this.modules[name] = view;
      
      this.$el.append(view.$el);
    }
  });

  return View;
});