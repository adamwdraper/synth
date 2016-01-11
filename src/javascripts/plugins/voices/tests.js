define([
  'jquery',
  'underscore',
  'backbone',
  './plugin'
], function($, _, Backbone, Plugin) {
  var plugin = new Plugin();

  describe('Voices Plugin', function() {
    describe('Plugin', function() {
      it('Exists', function() {
        assert.ok(plugin);
      });
    });
  });
});
