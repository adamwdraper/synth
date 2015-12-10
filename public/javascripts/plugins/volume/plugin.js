/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  './settings',
  'template!./template.html'
], function($, _, Backbone, context, Settings, template) {
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

      this.node = context.createGain();
    },
    render: function() {
      this.$el.html(this.template());

      this.addConnections();

      this.updateVolume();

      this.stickit(this.settings);
      
      return this;
    },
    addConnections: function() {
      _.each(this.data.connections, function(node) {
        this.node.connect(node)
      }, this);
    },
    updateVolume: function() {
      this.node.gain.value = this.settings.get('volume');
    }
  });

  return View;
});