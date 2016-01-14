define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/midi/utility',
  './settings',
  'template!./template.html'
], function($, _, Backbone, midi, Settings, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    template: template,
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
    render: function() {
      this.$el.html(this.template());

      return this;
    },
    startNote: function(event) {
      var note;

      if (event && event.keyCode && this.map[event.keyCode]) {
        switch (this.map[event.keyCode]) {
          case 100:
            this.settings.octaveDown();
            break;
          case 200:
            this.settings.octaveUp();
            break;
          default:
            note = this.buildNote(event, {
              velocity: 100
            });
            break;
        }
      }

      if (note && !this.isActiveNote(note)) {
        this.trigger('note:on', note, this.activeNotes);
        this.addActiveNote(note);
      }
    },
    stopNote: function(event) {
      var note;

      if (event && event.keyCode && this.map[event.keyCode]) {
        switch (this.map[event.keyCode]) {
          case 100:
          case 200:
            break;
          default:
            note = this.buildNote(event, {
              velocity: 0
            });
            break;
        }
      }

      if (note && this.isActiveNote(note)) {
        this.removeActiveNote(note);
        this.trigger('note:off', note, this.activeNotes);
      }
    },
    buildNote: function(event, options) {
      var number = this.map[event.keyCode] + (this.settings.get('octave') * 12);
            
      return _.extend({
        number: number,
        frequency: midi.noteNumberToFrequency(number),
        timeStamp: event.timeStamp
      }, options);
    },
    isActiveNote: function(note) {
      return _.findWhere(this.activeNotes, {
        number: note.number
      });
    },
    addActiveNote: function(note) {
      this.activeNotes.push(note);
    },
    removeActiveNote: function(note) {
      var index = _.findIndex(this.activeNotes, {
        number: note.number
      });

      if (index > -1) {
        this.activeNotes.splice(index, 1);
      }
    }
  });

  return View;
});