/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/voice/plugin',
  'plugins/volume/plugin',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, Oscilliscope, Oscillator, Voice, Volume, template) {
  var View = Backbone.View.extend({
    template: template,
    instrument: null,
    modules: {},
    sources: {},
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

      // Analyzer
      this.initializeModule('oscilliscope', Oscilliscope);

      // Master Volume
      this.initializeModule('master', Volume, {
        connections: [
          this.modules.oscilliscope.node,
          context.destination
        ]
      });

      this.initializeSource('oscillator', Oscillator, {
        connections: [
          this.modules.master.node
        ]
      });

      // Voice
      this.voice = new Voice({
        input: keyboard,
        sources: this.sources 
      });

      this.renderAll();

      return this;
    },
    initializeModule: function(name, Module, options) {
      return this.initializeView('module', name, Module, options);
    },
    initializeSource: function(name, Source, options) {
      return this.initializeView('source', name, Source, options);
    },
    initializeView: function(type, name, View, options) {
      var view;

      options = options || {};

      view = new View(options);

      this[type + 's'][name] = view;

      return view;
    },
    renderAll: function() {
      this.$modules.append(this.voice.render().$el);

      _.each(this.sources, function(source) {
        this.$modules.append(source.render().$el);
      }, this);
      
      _.each(this.modules, function(module) {
        this.$modules.append(module.render().$el);
      }, this);
    }
  });

  return View;
});