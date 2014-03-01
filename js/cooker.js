/*!
 * cooker v0.0.0
 * Copyright 2014 TEQ inc.
 * Licensed under ,, (,,)
 */
(function($) {
  "use strict";
  var namespace = "tooltips";
  var methods = {
    init: function(options) {
      options = $.extend({
        activeClass: "tooltips-active"
      }, options);
      $("body").append('<div class="tooltip fade"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>');
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
        var action = $this.data("action");
        if (action === "click") {
          $this.off("click." + namespace).on("click." + namespace, function() {
            methods.toggle.apply(_this);
            return false;
          });
          $("body").off("click." + namespace).on("click." + namespace, function() {
            methods.hide.apply(_this);
          });
        } else {
          $this.off("mouseenter." + namespace).on("mouseenter." + namespace, function() {
            methods.show.apply(_this);
          });
          $this.off("mouseleave." + namespace).on("mouseleave." + namespace, function() {
            methods.hide.apply(_this);
          });
          $this.off("click." + namespace).on("click." + namespace, function() {
            return false;
          });
        }
      });
    },
    toggle: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var active = $this.hasClass(options.activeClass);
      var $tipStatus = $(".tooltip").css("visibility");
      if ($tipStatus == "hidden" || !active) {
        methods.show.call(this, options);
      } else {
        methods.hide.call(this, options);
      }
    },
    position: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var pos = $this.data("position");
      var iWidth = $this.outerWidth();
      var iHeight = $this.outerHeight();
      var iPos = $this.position();
      var $tip = $(".tooltip");
      var $tipArrow = $tip.find(".tooltip-arrow");
      var tipArrowHeight = $tipArrow.outerHeight();
      var tipArrowWidth = $tipArrow.outerWidth();
      var tipWidth = $tip.outerWidth();
      var tipHeight = $tip.outerHeight();
      var margin = 3;
      var hol = iPos.top - tipHeight / 2 + iHeight / 2;
      var vur = iPos.left - tipWidth / 2 + iWidth / 2;
      switch (pos) {
       case "top":
        $tip.css({
          top: iPos.top - tipHeight - tipArrowHeight - margin,
          left: vur
        });
        break;

       case "bottom":
        $tip.css({
          top: iPos.top + iHeight,
          left: vur
        });
        break;

       case "left":
        $tip.css({
          top: hol,
          left: iPos.left - tipWidth - tipArrowWidth - margin
        });
        break;

       case "right":
        $tip.css({
          top: hol,
          left: iPos.left + iWidth
        });
      }
    },
    show: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var pos = $this.data("position");
      methods.hide.call(this, options);
      methods.insert.call(this, options);
      methods.position.call(this, options);
      $this.addClass(options.activeClass);
      $(".tooltip").css({
        visibility: "visible"
      }).addClass("in " + pos);
    },
    hide: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var posClass = "in top bottom left right";
      $this.removeClass(options.activeClass);
      $(".tooltip").removeClass(posClass).css({
        visibility: "hidden"
      });
    },
    insert: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var title = $this.data("title") || $this.attr("title");
      var $tipInner = $(".tooltip").find(".tooltip-inner");
      $tipInner.html(title);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.tooltips = function(method) {
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
        minSize: 10,
        parentClass: ".tab-content"
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
          $this.find(".slidebar_toggle").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.toggle.apply(_this);
          });
          $this.find(".slidebar_open").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.open.apply(_this);
          });
          $this.find(".slidebar_close").unbind("click." + namespace).bind("click." + namespace, function() {
            methods.close.apply(_this);
          });
          $this.find(".slidebar_resize").mousedown(function(e) {
            var mx = e.pageX;
            var my = e.pageY;
            $(document).on("mousemove." + namespace, function(e) {
              var $body = $this.find(".slidebar_body");
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
                $this.removeClass("slidebar_open").addClass("slidebar_close");
              } else {
                $this.removeClass("slidebar_close").addClass("slidebar_open");
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
        $this.parents(options.parentClass).find(".slidebar_bottom_prev").removeClass("slidebar_close").addClass("slidebar_open");
        params.height = options.height;
        break;

       case "right":
       case "left":
        params.width = options.width;
      }
      $this.removeClass("slidebar_close").addClass("slidebar_open");
      $this.find(".slidebar_body").stop().animate(params, options.speed, options.easing);
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
        $this.parents(options.parentClass).find(".slidebar_bottom_prev").removeClass("slidebar_open").addClass("slidebar_close");
        params.height = 0;
        break;

       case "right":
       case "left":
        params.width = 0;
      }
      $this.removeClass("slidebar_open").addClass("slidebar_close");
      $this.find(".slidebar_body").stop().animate(params, options.speed, options.easing);
    },
    toggle: function(options) {
      var $this = $(this);
      if ($this.hasClass("slidebar_open")) {
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
      $.error("Method " + method + " does not exist on jQuery.Slidebar");
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
        warningCounter: "60",
        errorCounter: "65",
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