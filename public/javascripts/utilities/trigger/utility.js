/**
 * @appular trigger
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/midi/utility',
  './settings'
], function($, _, Backbone, midi, Settings) {
  var View = Backbone.View.extend({
    instrament: null,
    monoActiveNote: null,
    settings: new Settings(),
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      
      return this;
    },
    connectInstrament: function(instrament) {
      this.instrament = instrament;

      this.listenTo(this.instrament, 'note:on', this.dispatchStart);
      this.listenTo(this.instrament, 'note:off', this.dispatchStop);
    },
    dispatchStart: function(note, activeNotes) {
      this[this.settings.get('mode') + 'Start'](note, activeNotes);
    },
    dispatchStop: function(note, activeNotes) {
      this[this.settings.get('mode') + 'Stop'](note, activeNotes);
    },
    monoStart: function(note, activeNotes) {
      if (activeNotes.length) {
        this.triggerStop(_.last(activeNotes));
      }

      this.monoActiveNote = note;

      this.triggerStart(note);
    },
    monoStop: function(note, activeNotes) {
      var nextNote = _.last(activeNotes);

      this.triggerStop(note);

      if (nextNote && nextNote.frequency !== this.monoActiveNote.frequency) {
        this.monoActiveNote = nextNote;

        this.triggerStart(nextNote);
      }
    },
    polyStart: function(note, activeNotes) {
      this.triggerStart(note);
    },
    polyStop: function(note, activeNotes) {
      this.triggerStop(note);
    },
    triggerStart: function(note) {
      this.trigger('note:on', note);

      log('trigger', 'on', note);
    },
    triggerStop: function(note) {
      this.trigger('note:off', note);
      
      log('trigger', 'off', note);
    }
  });

  return new View();
});