define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      isActive: true,
      wave: 'sine',
      frequency: 440
    }
  });

  return Model;
});