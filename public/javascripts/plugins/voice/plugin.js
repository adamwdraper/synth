/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/midi/utility',
  './settings',
  'template!./template.html'
], function($, _, Backbone, midi, Settings, template) {
  var View = Backbone.View.extend({
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.listenTo(this.data.input, 'note:start', this.dispatchStart);
      this.listenTo(this.data.input, 'note:stop', this.stopSources);
      // this.$el.html(this.template());

      this.settings = new Settings();
      
      return this;
    },
    dispatchStart: function(note, activeNotes) {
      if (this.settings.get('mode') === 'mono') {
        if (activeNotes.length > 1) {
          log('update', note.note, activeNotes);
          this.updateSources(note);
        } else {
          log('start', note.note, activeNotes);
          this.startSources(note);
        }
      }
    },
    getFrequency: function(note) {
      return midi.noteNumberToFrequency(note);
    },
    startSources: function(note) {
      _.each(this.data.sources, function(source) {
        source.play(this.getFrequency(note.note));
      }, this);
    },
    updateSources: function(note) {
      _.each(this.data.sources, function(source) {
        source.update(midi.noteNumberToFrequency(note.note));
      }, this);
    },
    stopSources: function() {
      _.each(this.data.sources, function(source) {
        source.stop();
      }, this);
    }
  });

  return View;
});