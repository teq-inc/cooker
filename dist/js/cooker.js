/*!
 * cooker v0.1.4
 * Copyright 2014 TEQ inc.
 * Licensed under MIT
 * http://teq-inc.github.io/cooker/
 */
(function($) {
  var namespace = "switchers";
  var methods = {
    init: function(options) {
      options = $.extend({
        switcher: "switcher",
        toggle: "switcher-toggle",
        toggleAll: "switcher-toggle-all",
        open: "switcher-open",
        close: "switcher-close"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        var $aToggle = $this.find("." + options.toggleAll);
        var $iToggle = $this.find("." + options.toggle);
        $aToggle.off("click." + namespace).on("click." + namespace, function() {
          methods.toggleAll.apply(_this);
        });
        $iToggle.off("click." + namespace).on("click." + namespace, function() {
          methods.toggle.apply(_this);
        });
      });
    },
    toggleAll: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = options.open;
      var close = options.close;
      var $a = $this.find("." + options.switcher);
      var statusOpen = $a.hasClass(options.open);
      var $aToggle = $a.find("." + options.toggleAll);
      if (statusOpen) {
        $a.removeClass(open).addClass(close);
      } else {
        $a.removeClass(close).addClass(open);
      }
      console.log("methods.toggleAll");
    },
    toggle: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = options.open;
      var close = options.close;
      var $i = $(event.target).parents("." + options.switcher);
      var statusOpen = $i.hasClass(options.open);
      if (statusOpen) {
        methods.close.call(this);
      } else {
        methods.open.call(this);
      }
      console.log("methods.toggle");
    },
    open: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = options.open;
      var close = options.close;
      var mode = $this.data("mode");
      var $i = $(event.target).parents("." + options.switcher);
      var $o = $i.siblings();
      if (mode === "accordion") {
        $o.removeClass(open).addClass(close);
        $i.removeClass(close).addClass(open);
      } else {
        $i.removeClass(close).addClass(open);
      }
      console.log("methods.open");
    },
    close: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = options.open;
      var close = options.close;
      var mode = $this.data("mode");
      var $i = $(event.target).parents("." + options.switcher);
      var $o = $i.siblings();
      if (mode === "accordion") {
        $o, $i.removeClass(open).addClass(close);
      } else {
        $i.removeClass(open).addClass(close);
      }
      console.log("methods.close");
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.switchers = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "drawer";
  var agent = navigator.userAgent;
  var iphone = agent.search(/iPhone/) != -1;
  var ipad = agent.search(/iPad/) != -1;
  var android = agent.search(/Android/) != -1;
  var touches = iphone || ipad || android;
  var methods = {
    init: function(options) {
      options = $.extend({
        nav: "drawer-nav",
        navList: "drawer-nav-list",
        overlay: "drawer-overlay",
        toggle: "drawer-toggle",
        openClass: "drawer-open",
        closeClass: "drawer-close",
        desktopEvent: "mouseover",
        speed: 200,
        width: 280
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        smY = 0;
        var navListHeight;
        var $window = $(window);
        var $toggle = $("." + options.toggle);
        var $overlay = $("." + options.overlay);
        var $open = $("." + options.openClass);
        var $nav = $("." + options.nav);
        var $body = $("body");
        var bodyHeight = $body.height();
        methods.resize.call(_this, "init");
        $window.resize(function() {
          methods.resize.call(_this, "resize");
        });
        $nav.find("a").off("click." + namespace).on("click." + namespace, function() {
          methods.close.call(_this);
        });
        if (touches) {
          $toggle.bind("touchstart." + namespace, function(e) {
            methods.toggle.apply(_this);
          });
          $overlay.bind("touchstart." + namespace, function() {
            methods.close.apply(_this);
          });
          if ($this.height() < $nav.height()) {
            $nav.bind("touchstart." + namespace, function() {
              var $this = $(this);
              navListHeight = $this.height();
              sfY = event.touches[0].screenY;
              startTime = new Date().getTime();
              startY = event.changedTouches[0].clientY;
            });
            $nav.bind("touchmove." + namespace, function() {
              var $this = $(this);
              mfY = event.changedTouches[0].screenY;
              moveY = smY + mfY - sfY;
              draggedY = event.changedTouches[0].clientY - startY;
              $this.css({
                "-webkit-transition": "none",
                "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
              });
            });
            $nav.bind("touchend." + namespace, function() {
              var $this = $(this);
              diffTime = new Date().getTime() - startTime;
              smY = smY + (mfY - sfY);
              if (diffTime < 200 && draggedY > 0) {
                moveY += Math.abs(draggedY / diffTime * 500);
                $this.css({
                  "-webkit-transition": "-webkit-transform .7s ease-out",
                  "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
                });
                smY = moveY;
              } else if (diffTime < 200 && draggedY < 0) {
                moveY -= Math.abs(draggedY / diffTime * 500);
                $this.css({
                  "-webkit-transition": "-webkit-transform .7s ease-out",
                  "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
                });
                smY = moveY;
              }
              if (moveY > 0) {
                $this.css({
                  "-webkit-transition": "-webkit-transform .5s ease-out",
                  "-webkit-transform": "translate3d(0px,0px,0px)"
                });
                smY = 0;
              } else if (bodyHeight - navListHeight > moveY) {
                $this.css({
                  "-webkit-transition": "-webkit-transform .5s ease-out",
                  "-webkit-transform": "translate3d(0px," + (bodyHeight - navListHeight) + "px,0px)"
                });
                smY = bodyHeight - navListHeight;
              }
            });
          }
        } else {
          $toggle.off(options.desktopEvent + "." + namespace).on(options.desktopEvent + "." + namespace, function(e) {
            methods.toggle.apply(_this);
          });
          $overlay.off("click." + namespace).on("click." + namespace, function() {
            methods.close.apply(_this);
          });
        }
      });
    },
    resize: function(value) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var windowHeight = $(window).height();
      var $overlay = $("." + options.overlay);
      methods.close.call(this, options);
      $overlay.css({
        "min-height": windowHeight
      });
      console.log(value);
    },
    toggle: function(init, options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var $body = $("body");
      var open = $body.hasClass(options.openClass);
      if (open) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    },
    open: function(init) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var $body = $("body");
      if (touches) {
        $body.on("touchmove." + namespace, function() {
          event.preventDefault();
        });
        event.preventDefault();
      }
      $body.removeClass(options.closeClass).addClass(options.openClass);
    },
    close: function(init) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var $body = $("body");
      if (touches) {
        $body.off("touchmove." + namespace);
      }
      $body.removeClass(options.openClass).addClass(options.closeClass);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.drawer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "scrollmethod";
  var methods = {
    init: function(options) {
      options = $.extend({
        speed: 800,
        easing: "easeOutExpo"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          $this.off().on("click", function() {
            var href = $(this).attr("href");
            var $target = $(href === "#" || href === "" ? "html" : href);
            var position = $target.offset().top;
            $("body,html").animate({
              scrollTop: position
            }, options.speed, options.easing);
            return false;
          });
        }
      });
    }
  };
  $.fn.scrollmethod = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "inputcounter";
  var methods = {
    init: function(options) {
      options = $.extend({
        warningClass: "warning",
        errorClass: "error",
        warningCounter: 60,
        errorCounter: 65,
        maxCounter: ""
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          methods.check.apply(_this);
          $this.bind("keydown keyup keypress change", function() {
            methods.check.apply(_this);
          });
        }
      });
    },
    check: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var val = $this.val(), length = val.length;
      $this.removeClass(options.errorClass);
      $this.removeClass(options.warningClass);
      if (options.errorCounter <= length) {
        $this.addClass(options.errorClass);
      } else if (options.warningCounter <= length) {
        $this.addClass(options.warningClass);
      }
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.inputcounter = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "slidebar";
  var methods = {
    init: function(options) {
      options = $.extend({
        position: "left",
        speed: 500,
        easing: "easeOutExpo",
        minSize: 10
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
            width: $this.data("width"),
            height: $this.data("height")
          }, options);
          $this.data(namespace, {
            options: options
          });
          $this.find(".slidebar-toggle").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.toggle.apply(_this);
          });
          $this.find(".slidebar-open").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.open.apply(_this);
          });
          $this.find(".slidebar-close").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.close.apply(_this);
          });
          $this.find(".slidebar-resize").mousedown(function(e) {
            var mx = e.pageX;
            var my = e.pageY;
            $(document).on("mousemove." + namespace, function(e) {
              var $body = $this.find(".slidebar-body");
              var params = {};
              var f_close = false;
              switch (options.position) {
               case "top":
               case "bottom":
                params.height = $body.height() + my - e.pageY;
                if (params.height <= options.minSize) {
                  f_close = true;
                  params.height = 0;
                }
                break;

               case "right":
               case "left":
                params.width = $body.width() + mx - e.pageX;
                if (params.width <= options.minSize) {
                  f_close = true;
                  params.width = 0;
                }
              }
              if (f_close) {
                $this.removeClass("slidebar-open").addClass("slidebar-close");
              } else {
                $this.removeClass("slidebar-close").addClass("slidebar-open");
              }
              $body.css(params);
              mx = e.pageX;
              my = e.pageY;
              return false;
            }).one("mouseup", function(e) {
              $(document).off("mousemove." + namespace);
              f_slide = true;
            });
            return false;
          });
        }
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    },
    open: function(options) {
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch (options.position) {
       case "top":
        params.height = options.height;
        break;

       case "bottom":
        params.height = options.height;
        break;

       case "right":
       case "left":
        params.width = options.width;
      }
      $this.removeClass("slidebar-close").addClass("slidebar-open");
      $this.find(".slidebar-body").stop().animate(params, options.speed, options.easing);
    },
    close: function(options) {
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      var params = {};
      switch (options.position) {
       case "top":
        params.height = 0;
        break;

       case "bottom":
        params.height = 0;
        break;

       case "right":
       case "left":
        params.width = 0;
      }
      $this.removeClass("slidebar-open").addClass("slidebar-close");
      $this.find(".slidebar-body").stop().animate(params, options.speed, options.easing);
    },
    toggle: function(options) {
      var $this = $(this);
      if ($this.hasClass("slidebar-open")) {
        methods.close.call(this, options);
      } else {
        methods.open.call(this, options);
      }
    }
  };
  $.fn.slidebar = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  var namespace = "drilldown";
  var status_open = "dd-open";
  var status_close = "dd-close";
  var body = "drilldown-body";
  var cls_body = "." + body;
  var toggle = "drilldown-toggle";
  var open_all = "drilldown-open-all";
  var close_all = "drilldown-close-all";
  var data_level = "level";
  var clickOpen = function(options) {
    var $this = $(this);
    $this.removeClass(status_close).addClass(status_open);
    var level = $this.data(data_level) || 1;
    $this.nextAll(cls_body).each(function() {
      if ($(this).data(data_level) <= level) {
        return false;
      }
      if ($(this).data(data_level) > level + 1) {
        return true;
      }
      $(this).stop().show(options.speed);
    });
  };
  var clickClose = function(options) {
    var $this = $(this);
    $this.removeClass(status_open).addClass(status_close);
    var level = $this.data(data_level) || 1;
    $this.nextAll(cls_body).each(function() {
      if ($(this).data(data_level) <= level) {
        return false;
      }
      if ($(this).hasClass(body)) {
        $(this).removeClass(status_open).addClass(status_close);
      }
      $(this).stop().hide(options.speed);
    });
  };
  var clickToggle = function(options) {
    var $this = $(this).closest(cls_body);
    if ($this.hasClass(status_open)) {
      clickClose.call($this, options);
    } else {
      clickOpen.call($this, options);
    }
  };
  var methods = {
    init: function(options) {
      options = $.extend({
        speed: "fast"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        $this.find("." + toggle).unbind("click." + namespace).bind("click." + namespace, function() {
          var options = $this.data(namespace).options;
          clickToggle.call(this, options);
        });
        $this.find("." + open_all).unbind("click." + namespace).bind("click." + namespace, function() {
          methods.openAll.call(_this);
        });
        $this.find("." + close_all).unbind("click." + namespace).bind("click." + namespace, function() {
          methods.closeAll.call(_this);
        });
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    },
    openAll: function(options) {
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      $this.find(cls_body).each(function() {
        if ($(this).data(data_level) == 1) {
          clickOpen.call($(this), options);
        }
      });
    },
    closeAll: function(options) {
      var $this = $(this);
      options = $.extend($this.data(namespace).options, options);
      $this.find(cls_body).each(function() {
        if ($(this).data(data_level) == 1) {
          clickClose.call($(this), options);
        }
      });
    }
  };
  $.fn.drilldown = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.drilldown");
    }
  };
})(jQuery);