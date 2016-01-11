define(function() {
  var noteMap = {};
  var noteNumberMap = [];
  var notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
  ];
  var getBaseLog = function(value, base) {
    return Math.log(value) / Math.log(base);
  };
  var i;
  var index;
  var key;
  var octave;

  for(i = 0; i < 127; i++) {
    index = i;
    key = notes[index % 12];
    octave = ((index / 12) | 0) - 1; // MIDI scale starts at octave = -1

    if(key.length === 1) {
      key = key + '-';
    }

    key += octave;

    noteMap[key] = i;
    noteNumberMap[i] = key;
  }

  return {
    noteNameToNoteNumber: function(name) {
      return noteMap[name];
    },
    noteNumberToFrequency: function(note) {
      return 440.0 * Math.pow(2, (note - 69.0) / 12.0);
    },
    noteNumberToName: function(note) {
      return noteNumberMap[note];
    },
    frequencyToNoteNumber: function(f) {
      return Math.round(12.0 * getBaseLog(f / 440.0, 2) + 69);
    }
  };
});