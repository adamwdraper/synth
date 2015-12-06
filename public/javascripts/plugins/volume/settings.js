define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      volume: 0.5
    }
  });

  return Model;
});