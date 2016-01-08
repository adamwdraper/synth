define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'utilities/trigger/utility',
  'plugins/volume/plugin',
  './modules',
  './voices',
  'template!./template.html'  
], function($, _, Backbone, context, trigger, Volume, Modules, Voices, template) {
  var View = Backbone.View.extend({
    modules: new Modules(),
    voices: new Voices(),
    master: null,
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      _.bindAll(this, 'addModule', 'addConnections');
    },
    render: function() {
      this.$el.html(this.template());

      this.$modules = this.$el.find('[data-modules]');

      this.listenTo(trigger, 'note:on', this.createVoice);
      this.listenTo(trigger, 'note:off', this.offVoice);
      
      return this;
    },
    start: function() {
      this.createMaster();
    },
    setInstrament: function(instrament) {
      trigger.connectInstrament(instrament);
    },
    setModules: function(modules) {
      // add all voice modules
      _.each(modules, this.addModule);
    },
    createMaster: function() {
      var master;

      // add master Volume
      master = new Volume().render();

      this.$modules.append(master.$el);

      this.master = new master.node();

      this.master.create();

      this.master.addConnection(context.destination);
    },
    addModule: function(module, options) {
      var view;

      module.connections = module.connections || [];

      view = new module.view({
        connections: module.connections
      }).render();

      this.$modules.append(view.render().$el);

      this.modules.add(_.extend(module, {
        view: view,
        node: view.node
      }));

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
      if (connections.length) {
        for(i = 0; i < connections.length; i++) {
          node.addConnection(voice[connections[i]].node);
        }
      } else {
        node.addConnection(this.master.node);
      }
    }
  });

  return new View().render();
});