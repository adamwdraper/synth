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
    },
    render: function() {
      this.$el.html(this.template());

      this.node = this.data.context.createGain();
      this.node.connect(this.data.context.destination);
      this.node.connect(this.data.oscilliscope);

      this.stickit(this.settings);
      
      return this;
    },
    updateVolume: function(model, value) {
      this.node.gain.value = value;

      log(value);
    }
  });

  return View;
});