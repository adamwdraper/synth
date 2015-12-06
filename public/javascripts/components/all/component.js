/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  './states',
  'template!./template.html'
], function($, _, Backbone, States, template) {
  var View = Backbone.View.extend({
    template: template,
    bindings: {},
    listeners: {},
    events: {
      'click [data-start-stop]': 'toggleStartStop'
    },
    initialize: function() {},
    render: function() {
      this.states = new States();
      this.listenTo(this.states, 'change:isPlaying', this.log)

      this.$el.html(this.template());

      return this;
    },
    toggleStartStop: function() {
      this.states.toggle('isPlaying');
    },
    log: function(value) {
      log(value);
    }
  });

  return View;
});