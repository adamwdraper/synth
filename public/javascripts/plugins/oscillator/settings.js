define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      isActive: false,
      wave: 'sine'
    }
  });

  return Model;
});