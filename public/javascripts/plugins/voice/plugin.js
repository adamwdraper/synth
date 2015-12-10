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
      this.listenTo(this.data.input, 'note:stop', this.dispatchStop);
      // this.$el.html(this.template());

      this.settings = new Settings();
      
      return this;
    },
    dispatchStart: function(note, activeNotes) {
      this[this.settings.get('mode') + 'Start'](note, activeNotes);
    },
    dispatchStop: function(note, activeNotes) {
      this[this.settings.get('mode') + 'Stop'](note, activeNotes);
    },
    monoStart: function(note, activeNotes) {
      this.startSources(note.note);
    },
    monoStop: function(note, activeNotes) {
      if (activeNotes.length) {
        this.monoStart(activeNotes[activeNotes.length - 1], activeNotes);
      } else {
        this.stopSources(note.note);
      }
    },
    getFrequency: function(note) {
      return midi.noteNumberToFrequency(note);
    },
    startSources: function(note) {
      _.each(this.data.sources, function(source) {
        source.play(this.getFrequency(note));
      }, this);
    },
    stopSources: function(note) {
      _.each(this.data.sources, function(source) {
        source.stop(this.getFrequency(note));
      }, this);
    }
  });

  return View;
});