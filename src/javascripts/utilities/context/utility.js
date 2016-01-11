define(function() {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  
  return new AudioContext();
});