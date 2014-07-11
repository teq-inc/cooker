(function($) {
  var namespace = 'switchers';
  var methods = {
  
    init: function(options){
      options = $.extend({
        switcher:   'switcher',
        toggle:     'switcher-toggle',
        toggleAll:  'switcher-toggle-all',
        open:       'switcher-open',
        close:      'switcher-close'
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

        var mode = $this.data('mode');
        var $aToggle = $this.find('.'+options.toggleAll);
        var $iToggle = $this.find('.'+options.toggle);

        $aToggle.off('click.'+namespace).on('click.'+namespace, function(){
          methods.toggleAll.apply(_this);
        });

        $iToggle.off('click.'+namespace).on('click.'+namespace, function(){
          $self = $(this);
          var $i = $self.parents('.'+options.switcher);
          methods.toggle.call(_this, mode, $i);
        });    

      }); // end each
    },
    
    toggleAll: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      var $a = $this.children('.'+options.switcher);
      var statusOpen = $a.hasClass(options.open);
      if(statusOpen){
        $a.removeClass(options.open).addClass(options.close);
      }else{
        $a.removeClass(options.close).addClass(options.open);
      }
    },
    
    toggle: function(mode, $i){
      var $this = $(this);
      options = $this.data(namespace).options;
      var statusOpen = $i.hasClass(options.open);
      if(statusOpen){
        methods.close.call(this,mode, $i);
      }else{
        methods.open.call(this,mode, $i);      
      }
    },
    
    open: function(mode, $i){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var $iPrev = $i.prev('.'+options.switcher);
      var $iNext = $i.next('.'+options.switcher);
      var $o = $i.siblings();          
      if(mode === 'accordion'){
        $o.removeClass(options.open).addClass(options.close);
        $i.removeClass(options.close).addClass(options.open);    
        $o.removeClass("switcher-open-prev switcher-open-next");
        $iPrev.addClass("switcher-open-prev");
        $iNext.addClass("switcher-open-next");
      }else{
        $i.removeClass(options.close).addClass(options.open);
      }
    },

    close: function(mode, $i){
      var $this = $(this);
      options = $this.data(namespace).options;
      var $o = $i.siblings();          
      if(mode === 'accordion'){
        $o,
        $i.removeClass(options.open).addClass(options.close);
        $o.removeClass("switcher-open-prev switcher-open-next");
      }else{
        $i.removeClass(options.open).addClass(options.close);
      }
    },
    
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    
  };
  $.fn.switchers = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);