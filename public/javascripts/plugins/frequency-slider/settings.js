define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      frequency: 1500
    }
  });

  return Model;
});