define([
  'jquery',
  'underscore',
  'backbone',
  './settings'
], function($, _, Backbone, Settings) {
  var View = Backbone.View.extend({
    map: {
      '65': 1,
      '68': 5,
      '69': 4,
      '70': 6,
      '71': 8,
      '72': 10,
      '74': 12,
      '83': 3,
      '84': 7,
      '85': 11,
      '87': 2,
      '88': 200, // +
      '89': 9,
      '90': 100 // -
    },
    activeNotes: [],
    settings: new Settings(),
    listeners: {},
    events: {},
    initialize: function() {
      _.bindAll(this, 'startNote', 'stopNote');

      this.$document.on('keydown', this.startNote);
      this.$document.on('keyup', this.stopNote);
    },
    startNote: function(event) {
      var midiEvent;

      if (event && event.keyCode && this.map[event.keyCode]) {
        switch (this.map[event.keyCode]) {
          case 100:
            this.settings.octaveDown();
            break;
          case 200:
            this.settings.octaveUp();
            break;
          default:
            midiEvent = {
              event: 144,
              note: this.map[event.keyCode] + (this.settings.get('octave') * 12),
              velocity: 100,
              timeStamp: event.timeStamp
            };
            break;
        }
      }

      if (midiEvent && !this.isActiveNote(midiEvent.note)) {
        this.addActiveNote(midiEvent.note);
        this.trigger('note:start', midiEvent, this.activeNotes);
      }
    },
    stopNote: function(event) {
      var midiEvent;

      if (event && event.keyCode && this.map[event.keyCode]) {
        switch (this.map[event.keyCode]) {
          case 100:
          case 200:
            break;
          default:
            midiEvent = {
              event: 128,
              note: this.map[event.keyCode] + (this.settings.get('octave') * 12),
              velocity: 0,
              timeStamp: event.timeStamp
            };
            break;
        }
      }

      if (midiEvent && this.isActiveNote(midiEvent.note)) {
        this.removeActiveNote(midiEvent.note);
        this.trigger('note:stop', midiEvent, this.activeNotes);
      }
    },
    isActiveNote: function(note) {
      return this.activeNotes.indexOf(note) > -1;
    },
    addActiveNote: function(note) {
      this.activeNotes.push(note);
    },
    removeActiveNote: function(note) {
      var index = this.activeNotes.indexOf(note);

      this.activeNotes.splice(index, 1);
    }
  });

  return new View();
});