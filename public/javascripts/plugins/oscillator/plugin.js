/**
 * @appular oscillator
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/trigger/utility',
  './settings',
  'template!./template.html'
], function($, _, Backbone, context, trigger, Settings, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    template: template,
    bindings: {
      '[data-active]': 'isActive',
      '[data-wave]': 'wave'
    },
    listeners: {},
    events: {},
    initialize: function() {
      this.settings = new Settings();

      this.listenTo(trigger, 'note:start', this.play);
      this.listenTo(trigger, 'note:stop', this.stop);

      this.nodes = {};
    },
    render: function() {
      this.$el.html(this.template());

      this.stickit(this.settings);

      return this;
    },
    addConnections: function(node) {
      _.each(this.data.connections, function(connection) {
        node.connect(connection);
      }, this);
    },
    play: function(note) {
      var node;

      if (this.settings.get('isActive')) {
        this.stop(note.frequency);

        node = context.createOscillator();
        node.type = this.settings.get('wave');
        node.frequency.value = note.frequency;
        this.addConnections(node);
        node.start(0);

        this.nodes[note.frequency] = node;

        log('oscillator', 'play', node, this.nodes);
      }
    },
    stop: function(note) {
      var node = this.nodes[note.frequency];
      
      if (node) {
        node.stop(0);
        
        delete this.nodes[note.frequency];

        log('oscillator', 'stop', node, this.nodes);
      }
    }
  });

  return View;
});