(function($) {
  var namespace = 'inputcounters';
  var methods = {
    init: function(options){
      options = $.extend({
        warningClass: 'warning',
        errorClass:'error',
        warningCounter:'60',
        errorCounter:'65',
        maxCounter:''
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
          
          methods.check.apply(_this);
          
          $this.bind('keydown keyup keypress change', function(){
            methods.check.apply(_this);
          });
        
        }        
      }); // end each
    },
    check: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      
      var val = $this.val(), length = val.length;
      $this.removeClass(options.errorClass);
      $this.removeClass(options.warningClass);
      if(options.errorCounter <= length){
        $this.addClass(options.errorClass);
      } else if(options.warningCounter <= length){
        $this.addClass(options.warningClass);
      }
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.inputcounters = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
