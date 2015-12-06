define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      frequency: 3000
    }
  });

  return Model;
});