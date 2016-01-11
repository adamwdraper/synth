define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      volume: 0.3
    }
  });

  return Model;
});