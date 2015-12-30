/**
 * @appular boilerplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/keyboard/utility',
  'utilities/trigger/utility',
  'plugins/amp-envelope/plugin',
  'plugins/oscilliscope/plugin',
  'plugins/oscillator/plugin',
  'plugins/volume/plugin',
  './modules',
  './voices',
  'template!./template.html'
], function($, _, Backbone, context, keyboard, trigger, AmpEnvelope, Oscilliscope, Oscillator, Volume, Modules, Voices, template) {
  var View = Backbone.View.extend({
    template: template,
    instrument: null,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      this.modules = new Modules();
      this.voices = new Voices();
    },
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

      // Analyzer
      // this.renderModule('oscilliscope', Oscilliscope);

      this.renderModule('oscillator', Oscillator, [
        'ampEnvelope'
      ]);

      // Amp Envelope
      this.renderModule('ampEnvelope', AmpEnvelope, [
        'master'
      ]);

      // Master Volume
      this.renderModule('master', Volume, [
        context.destination
      ]);

      trigger.connectInstrament(keyboard);
      this.listenTo(trigger, 'note:on', this.createVoice);
      this.listenTo(trigger, 'note:off', this.offVoice);

      return this;
    },
    renderModule: function(name, View, connections) {
      var view;

      connections = connections || [];

      view = new View({
        connections: connections
      }).render();

      this.$modules.append(view.render().$el);

      this.modules.add({
        id: name,
        view: view,
        node: view.node,
        connections: connections
      });

      return view;
    },
    createVoice: function(note) {
      var voice = {};
      var i;
      var module
      var node;
      var id;

      // create all nodes
      for(i = 0; i < this.modules.length; i++) {
        module = this.modules.at(i);

        node = this.createNode(module);

        // add to voice
        voice[module.id] = node;
      }

      // connect voice nodes
      for(id in voice) {
        this.addConnections(this.modules.get(id), voice[id], voice);
      }

      // trigger play on voice nodes
      for(id in voice) {
        voice[id].trigger('note:on', note);
      }

      // store voice by note
      this.voices.add({
        id: note.number,
        modules: voice
      });
    },
    offVoice: function(note) {
      var voice = this.voices.get(note.number);
      var modules = voice.get('modules');

      // trigger play on voice nodes
      for(id in modules) {
        modules[id].trigger('note:off', note);
      }
    },
    createNode: function(module) {
      var Node = module.get('node');
      var node = new Node();

      node.create();

      return node;
    },
    addConnections: function(module, node, voice) {
      var connections = module.get('connections');
      var connection;
      var i;

      // make connections
      for(i = 0; i < connections.length; i++) {
        connection = _.isString(connections[i]) ? voice[connections[i]].node : connections[i];

        log('connecting', module.id, node.node, connection);

        node.addConnection(connection);
      }
    }
  });

  return View;
});