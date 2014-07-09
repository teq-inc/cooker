(function($) {
  var namespace = 'slidebar';
  var methods = {
    init: function(options){
      options = $.extend({
        position: 'left',
        speed: 500,
        easing: 'easeOutExpo',
        minSize: 10,
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
            width: $this.data('width'),
            height: $this.data('height')
          }, options);
          $this.data(namespace, {
            options: options
          });
          $this.find('.slidebar-toggle')
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.toggle.apply(_this);
            });
          $this.find('.slidebar-open')
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.open.apply(_this);
            });
          $this.find('.slidebar-close')
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.close.apply(_this);
            });
          $this.find('.slidebar-resize').mousedown(function(e) {
            var mx = e.pageX;
            var my = e.pageY;
            $(document).on('mousemove.'+namespace, function(e) {
              var $body = $this.find('.slidebar-body');
              var params = {};
              var f_close = false;
              switch(options.position) {
                case 'top':
                case 'bottom':
                params.height = $body.height() + my - e.pageY;
                if (params.height <= options.minSize) {
                  f_close = true;
                  params.height = 0;
                }
                break;
                case 'right':
                case 'left':
                params.width = $body.width() + mx - e.pageX;
                if (params.width <= options.minSize) {
                  f_close = true;
                  params.width = 0;
                }
              }
              if (f_close) {
                $this
                  .removeClass('slidebar-open')
                  .addClass('slidebar-close');
              } else {
                $this
                  .removeClass('slidebar-close')
                  .addClass('slidebar-open');
              }
              $body.css(params);
              mx = e.pageX;
              my = e.pageY;
              return false;
            }).one('mouseup', function() {
              $(document).off('mousemove.'+namespace);
              f_slide = true;
            });
            return false;
          });
        }
      }); // end each
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    open: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch(options.position) {
      case 'top':
        params.height = options.height;
        break;
      case 'bottom':
        params.height = options.height;
        break;
      case 'right':
      case 'left':
        params.width = options.width;
      }
      $this
        .removeClass('slidebar-close')
        .addClass('slidebar-open');
      $this.find('.slidebar-body')
        .stop()
        .animate(params, options.speed, options.easing);
    },
    close: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch(options.position) {
      case 'top':
        params.height = 0;
        break;
      case 'bottom':
        params.height = 0;
        break;
      case 'right':
      case 'left':
        params.width = 0;
      }
      $this
        .removeClass('slidebar-open')
        .addClass('slidebar-close');
      $this.find('.slidebar-body')
        .stop()
        .animate(params, options.speed, options.easing);
    },
    toggle: function(options){
      var $this = $(this);
      if ($this.hasClass('slidebar-open')) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    }
  };
  $.fn.slidebar = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);