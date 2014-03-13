(function($) {
  var namespace = 'drawer';
  var agent =  navigator.userAgent;
  var iphone = agent.search(/iPhone/) != -1;
  var ipad =   agent.search(/iPad/) != -1;
  var android = agent.search(/Android/) != -1;
  var methods = {
    init: function(options){
      options = $.extend({
        drawerBody:  namespace+'-body',
        toggleClass: namespace+'-toggle',
        openClass:   namespace+'-open',
        closeClass:  namespace+'-close'
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
        var $window = $(window)
        var $toggle = $('.'+options.toggleClass)
        var $body = $('.'+options.drawerBody)        
        
        methods.resize.call(_this, 'init')
        
        $window.resize(function() {
          methods.resize.call(_this, 'resize')          
        });	                
        $toggle.off('click.'+namespace).on('click.'+namespace, function(e){
           methods.toggle.apply(_this)
        });
        $body.off('click.'+namespace).on('click.'+namespace, function(){
          methods.hide.apply(_this)
        });     
      }); // end each
    },    
    resize: function(str_value){
      var $this = $(this)
      options = $this.data(namespace).options
      var windowHeight = $(window).height()
      var $body = $('.'+options.drawerBody)
      $body.css({
        'min-height': windowHeight,
      });
      console.log(str_value);
    },
    toggle: function(options){
      var $this = $(this)
      options = $this.data(namespace).options
      var $wrapper = $('body')
      var open = $wrapper.hasClass(options.openClass)
      if(open){
        methods.hide.call(this, options)
      }else{
        methods.show.call(this, options)        
      }
    },
    show: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var $wrapper = $('html,body')
      var $body = $('.'+options.drawerBody)
      if(iphone || ipad || android){
        $body.on('touchmove.noScroll', function(e) {
            e.preventDefault()
        });        
      }
      $wrapper
        .removeClass(options.closeClass)
        .addClass(options.openClass)
    },
    hide: function(){
      var $this = $(this)
      options = $this.data(namespace).options
      var $wrapper = $('html, body')
      var $body = $('.'+options.drawerBody)
      if(iphone || ipad || android){
        $body.off('.noScroll')
      }
      $wrapper
        .removeClass(options.openClass)
        .addClass(options.closeClass)
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
  };
  $.fn.drawer = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
