define([
  'jquery'
], function($) {
  $.fn.extend({
    toggleText: function(value1, value2) {
      return this.each(function() {
        var $this = $(this);
        var text = $this.text();

        if (text.indexOf(value1) > -1) {
          $this.text(text.replace(value1, value2));
        } else {
          $this.text(text.replace(value2, value1));
        }
      });
    },
    activate: function($list) {
      return this.each(function() {
        var $this = $(this);
        var classes = 'active';

        if ($list) {
          $list.removeClass(classes);
        } else {
          $this.siblings().removeClass(classes);
        }

        $this.addClass(classes);
      });
    },
    isActive: function() {
      return $(this).hasClass('active');
    },
    activateRotate: function(time) {
      return this.each(function() {
        var $children = $(this).children();
        var index = 0;
        var rotate = function() {
          $child = $children.eq(index);

          $child.activate();
          
          if ($children.length > 1) {
            index = index >= $children.length - 1 ? 0 : index + 1;

            timer = setTimeout(rotate, time);
          }
        };

        time = time || 3000;
        
        rotate();
      });
    }
  });

  $.extend({
    getParameterByName: function(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);

      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
  });
});