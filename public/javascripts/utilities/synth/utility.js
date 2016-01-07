define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/trigger/utility',
  './modules',
  './voices',
  'template!./template.html'  
], function($, _, Backbone, trigger, Modules, Voices, template) {
  var View = Backbone.View.extend({
    modules: new Modules(),
    voices: new Voices(),
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

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
      var module;
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

      // trigger off on same note
      if(this.voices.get(note.number)) {
        this.offVoice(note);

        this.voices.remove(note.number);
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
      var id;

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

  return new View().render();
});