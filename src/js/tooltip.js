(function($) {
  var namespace = 'tooltips'
  var methods = {
    init: function(options){
      options = $.extend({
        tooltipClass: 'tooltips',
        activeClass: 'tooltips-active',
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
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
        
        if(action === 'click'){
          $this.off('click').on('click', function(e){
          
            $('.tooltip').remove()
            methods.template.apply(_this)
            
            var $this = $(this)
            var title = $this.attr('title')
            var $tip = $('.tooltip')
            var $tipInner = $tip.find('.tooltip-inner')
            
            $tipInner.html(title)                        
            methods.position.apply(_this)
            methods.show.apply(_this)

            return false
          
          })
          $('body').off('click').on('click', function(e){
            var $tip = $('.tooltip')
            $tip.remove()
            return false
          })
          
          
        } else { //hover
        
          $this.off('mouseenter').on('mouseenter', function(e){

            methods.template.apply(_this)
            
            var $this = $(this)
            var title = $this.attr('title')
            var $tip = $('.tooltip')
            var $tipInner = $tip.find('.tooltip-inner')
            
            $tipInner.html(title)                        
            methods.position.apply(_this)
            methods.show.apply(_this)

          })

          $this.off('mouseleave').on('mouseleave', function(e){
            var $this = $(this)
            var $tip = $('.tooltip')
            $tip.remove()
            return false
          })

        }
      }); // end each
    },
    position: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var pos = $this.data('position')
      var iWidth = $this.outerWidth();
      var iHeight = $this.outerHeight();
      var iPos = $this.position();
      var $tip = $('.tooltip');
      var $tipArrow = $tip.find('.tooltip-arrow');
      var tipArrowHeight = $tipArrow.outerHeight();
      var tipArrowWidth = $tipArrow.outerWidth();
      var tipPos = $tip.position();
      var tipWidth = $tip.outerWidth();
      var tipHeight = $tip.outerHeight();
      var margin = 3;
      var lrTop = iPos.top - (tipHeight / 2)  + (iHeight / 2);
      var tbLeft = iPos.left - (tipWidth / 2) + (iWidth / 2);

      if(pos === 'left'){
        var leftCssLeft = iPos.left - tipWidth - tipArrowWidth - margin;
        $tip.css({
          'top':lrTop,
          'left':leftCssLeft,
        });      
      }else if(pos === 'right'){
        var rightCssLeft = iPos.left + iWidth;
        $tip.css({
          'top':lrTop,
          'left':rightCssLeft,
        });      
      }else if(pos === 'top'){
        var topCssTop = iPos.top - tipHeight - tipArrowHeight - margin;
        $tip.css({
          'top':topCssTop,
          'left':tbLeft,
        });      
      }else{
        var bottomCssTop = iPos.top + iHeight;
        $tip.css({
          'top':bottomCssTop,
          'left':tbLeft,
        });      
      }
      
    },
    show: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var pos = $this.data('position')
      var $tip = $('.tooltip');
      $tip.addClass('fade in ' + pos);
    },
    template: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var template = options.template      
      $('body').append(template)
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
