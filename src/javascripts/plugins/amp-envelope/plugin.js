define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  './node',
  './settings',
  'template!./template.html'
], function($, _, Backbone, context, Node, Settings, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    node: null,
    template: template,
    bindings: {
      '[data-attack]': {
        observe: 'attack',
        onSet: 'formatValue'
      },
      '[data-decay]': {
        observe: 'decay',
        onSet: 'formatValue'
      },
      '[data-sustain]': {
        observe: 'sustain',
        onSet: 'formatValue'
      },
      '[data-release]': {
        observe: 'release',
        onSet: 'formatValue'
      }
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();

      Node.prototype.settings = this.settings;

      this.node = Node;
    },
    render: function() {
      this.$el.html(this.template());
      
      this.stickit(this.settings);

      return this;
    },
    formatValue: function(value) {
      return Number(value);
    }
  });

  return View;
});