/**
 * @appular plugin
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'utilities/context/utility',
  'template!./template.html'
], function($, _, Backbone, context, template) {
  var View = Backbone.View.extend({
    className: 'ui-module',
    node: null,
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      _.bindAll(this, 'draw');
      
      this.node = context.createAnalyser();
      this.node.fftSize = 2048;
      this.bufferLength = this.node.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
    },
    render: function() {
      this.$el.html(this.template());

      this.canvas = this.$el.find('canvas')[0];
      this.canvasContext = this.canvas.getContext("2d");

      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.draw();

      return this;
    },
    draw: function() {
      requestAnimationFrame(this.draw);
      
      this.node.getByteTimeDomainData(this.dataArray);

      this.canvasContext.fillStyle = 'rgb(240, 240, 240)';
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