(function($) {
  var namespace = 'tabs';
  var methods = {

    init: function(options){
      options = $.extend({
        tab:          'navs-tabs',
        toggle:       'navs-tabs-toggle',
        contents:     'tabs-content',
        panel:        'tabs-pane',
        activeClass:  'active'
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);

        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }

        var $content = $this.next("."+options.contents);
        var $pane =  $content.find("."+options.panel);
        var $toggle =  $this.find("a");

        $toggle.off('click.'+namespace).on('click.'+namespace, function(event){
          event.preventDefault();
          var $self = $(this);
          var $li = $self.closest('li'); //クリックしたaタグの隣接した親のli
          var dropdown = $li.hasClass("dropdown"); // liに".dropdown"クラスがついてるか確認

          if(!dropdown){ //"dropdown"クラスが付いた要素以外で実行
            methods.activate.call(_this, $self, $li, $content, $pane);
          }

        });

      }); // end each
    },
            
    activate: function($self, $li, $content, $pane){
      var $this = $(this);
      var _this = this;
      options = $this.data(namespace).options;
      selectorId = $self.attr('href');
      // selector = selectorId.replace(/#/g,""); //#を削除
      var $other = $li.siblings(); // クリックの親li以外のli
      var $active = $content.find('> .' + options.activeClass);
      //ブラウザのtransitionサポートとfadeクラスが付いているか確認
      var transition = $.support.transition && $active.hasClass('fade');

      // navs-tabs
      $other.removeClass(options.activeClass);
      $li.addClass(options.activeClass);

      // tabs-content
      $pane.removeClass(options.activeClass);
      $content
        .find(selectorId)
        .addClass(options.activeClass);

      // fadeの場合、transitionが動作するように時間差で"in"クラスを付与
      if (transition) {
        methods.fade.call(_this, $content, $pane);
      } else {
        $pane.removeClass('fade');
      }

    },

    fade: function($content, $pane){
      var $this = $(this);
      options =   $this.data(namespace).options;
      delay =     1;

      // displayプロパティーがついてるとtransitionが効かないので、時間差でfade inクラスを追加
      setTimeout(function() {
        $pane.removeClass("in");
        $content
          .find(selectorId)
          .addClass("in");
      }, delay);
    },
    
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    
  };
  $.fn.tabs = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);