define([
  'backbone',
  './note'
], function(Backbone, Note) {
  var Collection = Backbone.Collection.extend({
    model: Note
  });

  return Collection;
});