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
    className: 'ui-module',
    node: null,
    template: template,
    bindings: {},
    listeners: {},
    events: {},
    initialize: function() {
      _.bindAll(this, 'draw');
      
      this.node = this.data.context.createAnalyser();
      this.node.fftSize = 256;
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

      var barWidth = (this.canvas.width / this.bufferLength) * 2.5;
      var barHeight;
      var x = 0;
      
      for(var i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];

        this.canvasContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        this.canvasContext.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
      }
    }
  });

  return View;
});