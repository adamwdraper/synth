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
    volume: null,
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

      this.volume = this.data.context.createGain();
      this.volume.connect(this.data.context.destination);

      this.stickit(this.settings);
      
      return this;
    },
    updateVolume: function(model, value) {
      this.volume.gain.value = value;

      log(value);
    }
  });

  return View;
});