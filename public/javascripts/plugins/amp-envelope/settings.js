define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      attack: 0,
      decay: 0,
      sustain: 1,
      release: 0
    }
  });

  return Model;
});