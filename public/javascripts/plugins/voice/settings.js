define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      mode: 'poly'
    }
  });

  return Model;
});