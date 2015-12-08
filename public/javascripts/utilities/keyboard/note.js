define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {},
    getAction: function() {
      return this.get('data')[0] === 144 ? 'start' : 'stop';
    }
  });

  return Model;
});