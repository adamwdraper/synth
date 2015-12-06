define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      isPlaying: false,
      volume: 0.5
    }
  });

  return Model;
});