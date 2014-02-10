/*!
 * cooker v0.0.0
 * Copyright 2014 TEQ inc.
 * Licensed under MIT (https://github.com/teq-inc/cooker)
 */
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

(function($) {
  var namespace = 'inputcounter';
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
  $.fn.inputcounter = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);

(function($) {
  var namespace = 'scrollmethod';
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
  $.fn.scrollmethod = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);

(function($) {
  var namespace = 'slidebar';
  var methods = {
    init: function(options){
      options = $.extend({
        position: 'left',
        speed: 500,
        easing: 'easeOutExpo',
        minSize: 10,
        parentClass: '.tab-content'
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
            width: $this.data('width'),
            height: $this.data('height')
          }, options);
          $this.data(namespace, {
            options: options
          });
          $this.find('.slidebar_toggle')
              .unbind('click.'+namespace)
              .bind('click.'+namespace, function(){
                methods.toggle.apply(_this);
              });
          $this.find('.slidebar_open')
              .unbind('click.'+namespace)
              .bind('click.'+namespace, function(){
                methods.open.apply(_this);
              });
          $this.find('.slidebar_close')
              .unbind('click.'+namespace)
              .bind('click.'+namespace, function(){
                methods.close.apply(_this);
              });
          $this.find('.slidebar_resize').mousedown(function(e) {
            var mx = e.pageX;
            var my = e.pageY;
            $(document).on('mousemove.'+namespace, function(e) {
              var $body = $this.find('.slidebar_body');
              var params = {};
              var f_close = false;
              switch(options.position) {
                case 'top':
                case 'bottom':
                params.height = $body.height() + my - e.pageY;
                if (params.height <= options.minSize) {
                  f_close = true;
                  params.height = 0;
                }
                break;
              //default: // left, right
                case 'right':
                case 'left':
                params.width = $body.width() + mx - e.pageX;
                if (params.width <= options.minSize) {
                  f_close = true;
                  params.width = 0;
                }
              }
              if (f_close) {
                $this
                    .removeClass('slidebar_open')
                    .addClass('slidebar_close');
              } else {
                $this
                    .removeClass('slidebar_close')
                    .addClass('slidebar_open');
              }
              $body.css(params);
              mx = e.pageX;
              my = e.pageY;
              return false;
            }).one('mouseup', function(e) {
              $(document).off('mousemove.'+namespace);
              f_slide = true;
            });
            return false;
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
    open: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch(options.position) {
      case 'top':
        params.height = options.height;
        break;
      case 'bottom':
        //開いた時にスライドバー下の内容が見えなくなるので、テンプレートに設定したslidebar_wrapにステータスクラス付け、
        //slidebarの高さ分、CSSで外側の要素にマージンを付けるようにしている。
        $this.parents(options.parentClass).find('.slidebar_bottom_prev')
          .removeClass('slidebar_close')
          .addClass('slidebar_open');
        params.height = options.height;
        break;
      case 'right':
      case 'left':
        params.width = options.width;
      }
      $this
          .removeClass('slidebar_close')
          .addClass('slidebar_open');
      $this.find('.slidebar_body')
          .stop()
          .animate(params, options.speed, options.easing);
    },
    close: function(options){
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch(options.position) {
      case 'top':
        params.height = 0;
        break;
      case 'bottom':
        //開いた時にスライドバー下の内容が見えなくなるので、テンプレートに設定したslidebar_wrapにステータスクラス付け、
        //slidebarの高さ分、CSSで外側の要素にマージンを付けるようにしている。
        $this.parents(options.parentClass).find('.slidebar_bottom_prev')
          .removeClass('slidebar_open')
          .addClass('slidebar_close');
        params.height = 0;
        break;
      case 'right':
      case 'left':
        params.width = 0;
      }
      $this
          .removeClass('slidebar_open')
          .addClass('slidebar_close');
      $this.find('.slidebar_body')
            .stop()
            .animate(params, options.speed, options.easing);
    },
    toggle: function(options){
      var $this = $(this);
      if ($this.hasClass('slidebar_open')) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    }
  };
  $.fn.slidebar = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.Slidebar' );
    }    
  };
})(jQuery);
