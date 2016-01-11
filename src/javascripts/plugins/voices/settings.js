define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      mode: 'mono'
    }
  });

  return Model;
});