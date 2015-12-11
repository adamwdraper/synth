/**
 * @appular trigger
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
    className: 'ui-module',
    template: template,
    bindings: {
      'input[type=radio]': 'mode'
    },
    listeners: {},
    events: {},
    initialize: function() {},
    render: function() {
      this.listenTo(this.data.input, 'note:start', this.dispatchStart);
      this.listenTo(this.data.input, 'note:stop', this.dispatchStop);
      
      this.monoActiveNote = null;

      this.$el.html(this.template());

      this.settings = new Settings();

      this.stickit(this.settings);
      
      return this;
    },
    dispatchStart: function(note, activeNotes) {
      this[this.settings.get('mode') + 'Start'](note, activeNotes);
    },
    dispatchStop: function(note, activeNotes) {
      this[this.settings.get('mode') + 'Stop'](note, activeNotes);
    },
    monoStart: function(note, activeNotes) {
      if (activeNotes.length) {
        this.stopSources(_.last(activeNotes));
      }

      this.monoActiveNote = note;

      this.startSources(note);
    },
    monoStop: function(note, activeNotes) {
      var nextNote = _.last(activeNotes);

      log('stop', note, nextNote, this.monoActiveNote);

      this.stopSources(note);

      if (nextNote && nextNote.frequency !== this.monoActiveNote.frequency) {
        this.monoActiveNote = nextNote;

        this.startSources(nextNote);
      }
    },
    polyStart: function(note, activeNotes) {
      this.startSources(note);
    },
    polyStop: function(note, activeNotes) {
      this.stopSources(note);
    },
    startSources: function(note) {
      _.each(this.data.sources, function(source) {
        source.play(note.frequency);
      }, this);
    },
    stopSources: function(note) {
      _.each(this.data.sources, function(source) {
        source.stop(note.frequency);
      }, this);
    }
  });

  return new View();
});