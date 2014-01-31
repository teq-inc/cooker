(function($) {
  var namespace = 'drilldown';
  var cls_status_open = 'dd_open';
  var cls_status_close = 'dd_close';
  var cls_body = 'drilldown_body';
  var dot_cls_body = '.'+cls_body;
  var cls_toggle = 'drilldown_toggle';
  var cls_open_all = 'drilldown_open_all';
  var cls_close_all = 'drilldown_close_all';
  var data_level = 'dd_level';
  var clickOpen = function(options){
    var $this = $(this);
    $this
        .removeClass(cls_status_close)
        .addClass(cls_status_open);
    var level = $this.data(data_level) || 1;
    $this.nextAll(dot_cls_body).each(function(){
      if ($(this).data(data_level) <= level) {
        return false;
      }
      if ($(this).data(data_level) > level + 1) {
        return true;
      }
      $(this)
          .stop()
          .show(options.speed);
    });
  };
  var clickClose = function(options){
    var $this = $(this);
    $this
        .removeClass(cls_status_open)
        .addClass(cls_status_close);
    var level = $this.data(data_level) || 1;
    $this.nextAll(dot_cls_body).each(function(){
      if ($(this).data(data_level) <= level) {
        return false;
      }
      if ($(this).hasClass(cls_body)) {
        $(this)
            .removeClass(cls_status_open)
            .addClass(cls_status_close);
      }
      $(this)
          .stop()
          .hide(options.speed);
    });
  };
  var clickToggle = function(options){
    var $this = $(this).closest(dot_cls_body);
    if ($this.hasClass(cls_status_open)) {
      clickClose.call($this, options);
    } else {
      clickOpen.call($this, options);
    }
  };
  var methods = {
    init: function(options){
      options = $.extend({
        speed: 'fast'
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
        $this.find('.'+cls_toggle)
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              var options = $this.data(namespace).options;
              clickToggle.call(this, options);
            });
        $this.find('.'+cls_open_all)
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.openAll.call(_this);
            });
        $this.find('.'+cls_close_all)
            .unbind('click.'+namespace)
            .bind('click.'+namespace, function(){
              methods.closeAll.call(_this);
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
    openAll: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      $this.find(dot_cls_body).each(function(){
        if ($(this).data(data_level) == 1) {
          clickOpen.call($(this), options);
        }
      });
    },
    closeAll: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      $this.find(dot_cls_body).each(function(){
        if ($(this).data(data_level) == 1) {
          clickClose.call($(this), options);
        }
      });
    }
  };
  $.fn.drilldown = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.drilldown' );
    }    
  };
})(jQuery);
