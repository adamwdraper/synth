define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      min: 0,
      max: 1
    }
  });

  return Model;
});