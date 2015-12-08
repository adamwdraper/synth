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
                'eventName': 'MIDIMessageEvent',
                'data': [
                  144,
                  this.map[event.keyCode] + (this.settings.get('octave') * 12),
                  100
                ],
                'timeStamp': event.timeStamp
              };
              break;
        }
      }

      if (midiEvent) {
        this.trigger('note:start', midiEvent);
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
                'eventName': 'MIDIMessageEvent',
                'data': [
                  128,
                  this.map[event.keyCode] + (this.settings.get('octave') * 12),
                  0
                ],
                'timeStamp': event.timeStamp
              };
              break;
        }
      }

      if (midiEvent) {
        this.trigger('note:stop', midiEvent);
      }
    }
  });


        // function _keyup(e) {
        //     // TODO: solve i18n issue
        //     var midievent = null;

        //     if(e && e.keyCode && mapping[e.keyCode]) {
        //         switch(mapping[e.keyCode]) {
        //             // octave down
        //             case 100:

        //             break;
        //             // octave up
        //             case 200:

        //             break;
        //             // note
        //             default:
        //                 midievent = {
        //                     'eventName': 'MIDIMessageEvent',
        //                     'data': [128, mapping[e.keyCode] + (currentOctave * 12), 0],
        //                     'timeStamp': e.timeStamp
        //                 };
        //             break;
        //         }
        //     }

        //     if(midievent) {
        //         $window.postMessage(midievent, '*');
        //         var pos = activeNotes.indexOf(midievent.data[1]);
        //         activeNotes.splice(pos, 1);
        //     }
        // }
  return new View();
});