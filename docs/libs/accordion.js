(function($) {
  var namespace = 'accordion';
  
  var methods = {
    init: function(options){
      options = $.extend({
        wrapperClass:  'accordions',
        itemClass:     'accordion',
        toggleClass:   'accordion-toggle',
        bodyClass:     'accordion-body',
        closeClass:    'accordion-close',
        openClass:     'accordion-open',
        openSpeed:     200,
        closeSpeed:    5
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

        $this.find('.'+options.bodyClass).css('display','none');
        
        var $itemToggle = $this.find('.'+options.toggleClass);
        
        $itemToggle
          .off('click.'+namespace)
          .on('click.'+namespace, function(){
            
            var $item = $(this).parent('.'+options.itemClass);
            var $itemBody = $item.find('.'+options.bodyClass);
            var $itemSiblings = $item.siblings(); // $item以外の'.accordion'要素
            var $itemSiblingsBody = $itemSiblings.find('.'+options.bodyClass);

        		if($item.hasClass(options.openClass)){
          		$itemSiblings
            		.removeClass(options.openClass);           		
              $item
                .removeClass(options.openClass)
                .addClass(options.closeClass);
              $itemBody
                .stop()
                .fadeOut(options.closeSpeed);                
            }else{
          		$itemSiblings
            		.removeClass(options.openClass)
            		.addClass(options.closeClass);
              $item
                .removeClass(options.closeClass)
                .addClass(options.openClass);
              $itemBody
                .stop()
                .fadeIn(options.openSpeed);  
              $itemSiblingsBody
                .stop()
                .fadeOut(options.closeSpeed);  
            }
          });
        
      }); // end each
    },
        
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
  };
  $.fn.accordion = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
