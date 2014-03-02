(function($) {
  var namespace = 'scrollmethods';
  var methods = {
    init: function(options){
      options = $.extend({
        speed:   800,
        easing:  'easeOutExpo',
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
          $this.off().on('click',function() {
            var href= $(this).attr('href');
            var $target = $(href === '#' || href === '' ? 'html' : href);
            var position = $target.offset().top;
            $('body,html').animate({scrollTop:position}, options.speed, options.easing);
            return false;
          });
        }
      }); // end each
    },
  };
  $.fn.scrollmethods = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
