define([
    'jquery',
    'underscore',
    'backbone',
    './component'
], function($, _, Backbone, Component) {
    var component;

    describe('Boilerplate Component', function() {
        describe('Construction', function() {
            beforeEach(function(done) {
                component = new Component({
                    router: new Backbone.Router()
                });

                done();
            });

            it('Exists', function() {
                assert.ok(component);
            });
        });
    });
});
