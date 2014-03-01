(function($) {
  var namespace = 'dropdowns'
  var methods = {
    init: function(options){
      options = $.extend({
        dropdownClass: 'dropdown',
        toggleClass: 'dropdown-toggle',
        activeClass: 'dropdown-active'
      }, options)
      return this.each(function(){
        var _this = this
        var $this = $(this)
        var data = $this.data(namespace)
        if (!data) {
          options = $.extend({
          }, options)
          $this.data(namespace, {
              options: options
          })
        }
        var $toggle = $this.find('.'+options.toggleClass)
        var action = $this.data('action')
        var clickToggle = function(){
          $toggle.off('click').on('click', function(e){
            var $this = $(this);
            var $o = $this.parents('.'+options.dropdownClass).siblings();
            $o.removeClass(options.activeClass)
            e.stopPropagation()
            methods.toggle.apply(_this)
          })
          $('body').on('click', function(){
            methods.close.apply(_this)
          })          
        }
        var mouseHover = function(){
          $toggle.off('mouseover').on('mouseover', function(e){
            var $this = $(this);
            var $o = $this.parents('.'+options.dropdownClass).siblings();
            $o.removeClass(options.activeClass)
            methods.open.apply(_this)
          })
        }
        if(action === 'hover'){
          mouseHover()
          clickToggle()
        }else if(action === 'click'){
          clickToggle()
        } else {
          clickToggle()
        }
      }); // end each
    },
    toggle: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var active = $this.hasClass(options.activeClass)
      if(active){
        methods.close.call(this, options)
      }else{
        methods.open.call(this, options)
      }
    },
    open: function(){
      var $this = $(this)
      options = $this.data(namespace).options;
      $this.addClass(options.activeClass)
    },
    close: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      $this.removeClass(options.activeClass)
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this)
        $(window).unbind('.'+namespace)
        $this.removeData(namespace)
      })
    },
  }
  $.fn.dropdowns = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ))
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments )
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace)
    }    
  }
})(jQuery)
