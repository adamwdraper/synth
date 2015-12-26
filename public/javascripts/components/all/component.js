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
  'template!./template.html'
], function($, _, Backbone, context, keyboard, trigger, AmpEnvelope, Oscilliscope, Oscillator, Volume, template) {
  var View = Backbone.View.extend({
    template: template,
    instrument: null,
    modules: [],
    voices: {},
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

      // // Analyzer
      // this.initializeModule('oscilliscope', Oscilliscope);

      // Master Volume
      // this.initializeModule('master', Volume, {
      //   connections: [
      //     context.destination
      //   ]
      // });

      // Amp Envelope
      // this.initializeModule('ampEnvelope', AmpEnvelope, {
      //   connections: [
      //     this.voice.master.node
      //   ]
      // });

      this.renderModule('oscillator', Oscillator, [
        context.destination
      ]);

      trigger.connectInstrament(keyboard);
      this.listenTo(trigger, 'note:on', this.createVoice);

      return this;
    },
    renderModule: function(name, View, connections) {
      var view;

      connections = connections || [];

      view = new View({
        connections: connections
      }).render();

      this.$modules.append(view.render().$el);

      this.modules.push({
        id: name,
        view: view,
        node: view.node,
        connections: connections
      });

      return view;
    },
    createVoice: function(note) {
      var voice = [];
      var i;
      var module
      var node;
      var x;

      log(this.modules);

      // create all nodes
      for(i = this.modules.length; i-- > 0;) {
        module = this.modules[i];
        
        node = new module.node();

        // create node
        node.create();

        // make connections
        for(x = 0; x < module.connections.length; x++) {
          node.addConnection(module.connections[x]);
        }

        // add to voice
        voice.unshift(node);
      }

      log(voice);

      // trigger play
      for(i = voice.length; i > 0; i--) {
        node.trigger('note:on', note);
      }

      // store voice by note
      this.voices[note.number] = voice;
    }
  });

  return View;
});