define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      isPlaying: false
    }
  });

  return Model;
});