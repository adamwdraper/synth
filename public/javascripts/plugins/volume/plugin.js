/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  './settings',
  'template!./template.html'
], function($, _, Backbone, Settings, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    node: null,
    template: template,
    bindings: {
      '[data-volume]': 'volume'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();
      this.listenTo(this.settings, 'change:volume', this.updateVolume);

      this.node = this.data.context.createGain();
    },
    render: function() {
      this.$el.html(this.template());

      this.addConnections();

      this.stickit(this.settings);
      
      return this;
    },
    addConnections: function() {
      _.each(this.data.connections, function(node) {
        this.node.connect(node)
      }, this);
    },
    updateVolume: function(model, value) {
      this.node.gain.value = value;

      log(value);
    }
  });

  return View;
});