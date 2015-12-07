/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'template!./template.html'
], function($, _, Backbone, template) {
  var View = Backbone.View.extend({
    analyser: null,
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      _.bindAll(this, 'draw');
    },
    render: function() {
      this.$el.html(this.template());

      this.analyser = this.data.context.createAnalyser();

      this.analyser.fftSize = 2048;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);

      this.canvas = this.$el.find('canvas')[0];
      this.canvasContext = this.canvas.getContext("2d");

      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.draw();

      return this;
    },
    draw: function() {
      requestAnimationFrame(this.draw);
      
      this.analyser.getByteTimeDomainData(this.dataArray);

      this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
      this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.canvasContext.lineWidth = 2;
      this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';

      this.canvasContext.beginPath();

      var sliceWidth = this.canvas.width * 1.0 / this.bufferLength;
      var x = 0;

      for(var i = 0; i < this.bufferLength; i++) {
   
        var v = this.dataArray[i] / 128.0;
        var y = v * this.canvas.height/2;

        if(i === 0) {
          this.canvasContext.moveTo(x, y);
        } else {
          this.canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.canvasContext.lineTo(this.canvas.width, this.canvas.height/2);
      this.canvasContext.stroke();
    }
  });

  return View;
});