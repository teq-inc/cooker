(function($) {
  var namespace = 'dropdown';
  var methods = {
    init: function(options){
      options = $.extend({
        toggleClass:   'dropdown-toggle',
        bodyClass:     'dropdown-body',
        closeClass:    'close',
        openClass:     'open',
        openSpeed:     'fast',
        closeSpeed:    'fast',
        accordion:     false,
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
          }, options);
          $this.data(namespace, {
              options: options
          });
        }
                
        if(options.accordion === true){
          $this
            .find('.'+options.toggleClass)
            .off('click.'+namespace)
            .on('click.'+namespace, function(){
                methods.accordion.apply(_this);
          });

        } else {
        
        
          $this
            .find('.'+options.toggleClass)
            .off('click.'+namespace)
            .on('click.'+namespace, function(){
                methods.toggle.apply(_this);
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
    open: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      $this
        .removeClass(options.closeClass)
        .addClass(options.openClass);
      $this
        .find('.'+options.bodyClass)
        .stop()
        .fadeIn(options.openSpeed);
    },
    close: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      $this
        .removeClass(options.openClass)
        .addClass(options.closeClass);
      $this
        .find('.'+options.bodyClass)
        .stop()
        .fadeOut(options.closeSpeed);
    },
    toggle: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      if ($this.hasClass(options.closeClass))  {
        methods.open.call(this);
      } else {
        methods.close.call(this);
      }
    },
    accordion: function(){
      var $this = $(this);
      options = $this.data(namespace).options; 
      return this.each(function(){
        if ($this.hasClass(options.openClass))  {
          methods.close.call(this);
        } else {
          methods.open.call(this);
        }
      });
    }
  };
  $.fn.dropdown = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
