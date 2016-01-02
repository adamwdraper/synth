define(function() {
  return new (window.AudioContext || window.webkitAudioContext)();
});