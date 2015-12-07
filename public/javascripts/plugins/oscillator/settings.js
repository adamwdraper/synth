define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      isActive: false,
      wave: 'sine',
      frequency: 3000
    }
  });

  return Model;
});