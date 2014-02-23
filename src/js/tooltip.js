(function($) {
  var namespace = 'tooltips'
  var methods = {
    init: function(options){
      options = $.extend({
        tooltipClass: 'tooltips',
        activeClass: 'tooltip-active',
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
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

        var action = $this.data('action')
        var mouseOver = function(){
          $this.off('mouseenter').on('mouseenter', function(e){
            var template = options.template
            $('body').append(template)

            var $this = $(this);
            var title = $this.attr('title');
            var tipPos = $this.data('position');
            var iPos = $this.position()
            var $tip = $('.tooltip')
            
            $tip.html(title)
            $tip.css({
              'position':'fixed',
              'top':iPos.top,
              'left':iPos.left,
              'background-color':'blabk',
              'padding':'20px',
              'height':'30px',
              'z-index':9000,
              'border':'1px solid #000',
              'opacity':1
            })
            //$tip.show()
            
/*
            if(tipPos === 'left'){
              
            }ifelse(tipPos === 'right')){
            
            }ifelse(tipPos === 'top')){

            }ifelse(tipPos === 'bottom')){
              
            }
*/
            //e.stopPropagation()
            //e.preventDefault()
            //return false
            
          })
        }

        var mouseOut = function(){
          $this.off('mouseleave').on('mouseleave', function(e){
            var $this = $(this)
            var $tip = $('.tooltip')
            $tip.remove()
            return false
          })
        }

        if(action === 'hover'){
          mouseOver()
          mouseOut()
        }else if(action === 'click'){

        } else {

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
  $.fn.tooltips = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ))
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments )
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace)
    }    
  }
})(jQuery)
