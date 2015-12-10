define([
  'backbone'
], function(Backbone) {
  var Model = Backbone.Model.extend({
    defaults: {
      octave: 5
    },
    octaveDown: function() {
      var octave = this.get('octave');

      if (octave) {
        this.set('octave', octave - 1);
      }
    },
    octaveUp: function() {
      var octave = this.get('octave');

      if (octave < 9) {
        this.set('octave', octave + 1);
      }
    }
  });

  return Model;
});