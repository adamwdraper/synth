/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'utilities/midi/utility',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/voices/plugin',
  'plugins/volume/plugin',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, midi, Oscilliscope, Oscillator, Voices, Volume, template) {
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

      // Voice
      this.instrument = new Voices({
        input: keyboard
      });
      this.listenTo(this.instrument, 'note:start', this.startSources);
      this.listenTo(this.instrument, 'note:stop', this.stopSources);

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
      this.instrument.render();

      _.each(this.sources, function(source) {
        this.$modules.append(source.render().$el);
      }, this);
      
      _.each(this.modules, function(module) {
        this.$modules.append(module.render().$el);
      }, this);
    },
    stopSources: function() {
      _.each(this.sources, function(source) {
        source.stop();
      });
    },
    startSources: function(note) {
      _.each(this.sources, function(source) {
        source.set('frequency', midi.noteNumberToFrequency(note.note));
        source.play();
      });
    }
  });

  return View;
});