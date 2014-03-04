/*!
 * cooker v0.0.0
 * Copyright 2014 TEQ inc.
 * Licensed under ,, (,,)
 */
!function($) {
  "use strict";
  var namespace = "tooltips", methods = {
    init: function(options) {
      return options = $.extend({
        activeClass: "tooltips-active"
      }, options), $("body").append('<div class="tooltip fade"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'), 
      this.each(function() {
        var _this = this, $this = $(this), data = $this.data(namespace);
        data || (options = $.extend({}, options), $this.data(namespace, {
          options: options
        }));
        var action = $this.data("action");
        "click" === action ? ($this.off("click." + namespace).on("click." + namespace, function() {
          return methods.toggle.apply(_this), !1;
        }), $("body").off("click." + namespace).on("click." + namespace, function() {
          methods.hide.apply(_this);
        })) : ($this.off("mouseenter." + namespace).on("mouseenter." + namespace, function() {
          methods.show.apply(_this);
        }), $this.off("mouseleave." + namespace).on("mouseleave." + namespace, function() {
          methods.hide.apply(_this);
        }), $this.off("click." + namespace).on("click." + namespace, function() {
          return !1;
        }));
      });
    },
    toggle: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var active = $this.hasClass(options.activeClass), $tipStatus = $(".tooltip").css("visibility");
      "hidden" != $tipStatus && active ? methods.hide.call(this, options) : methods.show.call(this, options);
    },
    position: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var pos = $this.data("position"), iWidth = $this.outerWidth(), iHeight = $this.outerHeight(), iPos = $this.position(), $tip = $(".tooltip"), $tipArrow = $tip.find(".tooltip-arrow"), tipArrowHeight = $tipArrow.outerHeight(), tipArrowWidth = $tipArrow.outerWidth(), tipWidth = $tip.outerWidth(), tipHeight = $tip.outerHeight(), margin = 3, hol = iPos.top - tipHeight / 2 + iHeight / 2, vur = iPos.left - tipWidth / 2 + iWidth / 2;
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
      methods.hide.call(this, options), methods.insert.call(this, options), methods.position.call(this, options), 
      $this.addClass(options.activeClass), $(".tooltip").css({
        visibility: "visible"
      }).addClass("in " + pos);
    },
    hide: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var posClass = "in top bottom left right";
      $this.removeClass(options.activeClass), $(".tooltip").removeClass(posClass).css({
        visibility: "hidden"
      });
    },
    insert: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var title = $this.data("title") || $this.attr("title"), $tipInner = $(".tooltip").find(".tooltip-inner");
      $tipInner.html(title);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace), $this.removeData(namespace);
      });
    }
  };
  $.fn.tooltips = function(method) {
    return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery." + namespace) : methods.init.apply(this, arguments);
  };
}(jQuery), function($) {
  var namespace = "slidebar", methods = {
    init: function(options) {
      return options = $.extend({
        position: "left",
        speed: 500,
        easing: "easeOutExpo",
        minSize: 10,
        parentClass: ".tab-content"
      }, options), this.each(function() {
        var _this = this, $this = $(this), data = $this.data(namespace);
        data || (options = $.extend({
          width: $this.data("width"),
          height: $this.data("height")
        }, options), $this.data(namespace, {
          options: options
        }), $this.find(".slidebar_toggle").unbind("click." + namespace).bind("click." + namespace, function() {
          methods.toggle.apply(_this);
        }), $this.find(".slidebar_open").unbind("click." + namespace).bind("click." + namespace, function() {
          methods.open.apply(_this);
        }), $this.find(".slidebar_close").unbind("click." + namespace).bind("click." + namespace, function() {
          methods.close.apply(_this);
        }), $this.find(".slidebar_resize").mousedown(function(e) {
          var mx = e.pageX, my = e.pageY;
          return $(document).on("mousemove." + namespace, function(e) {
            var $body = $this.find(".slidebar_body"), params = {}, f_close = !1;
            switch (options.position) {
             case "top":
             case "bottom":
              params.height = $body.height() + my - e.pageY, params.height <= options.minSize && (f_close = !0, 
              params.height = 0);
              break;

             case "right":
             case "left":
              params.width = $body.width() + mx - e.pageX, params.width <= options.minSize && (f_close = !0, 
              params.width = 0);
            }
            return f_close ? $this.removeClass("slidebar_open").addClass("slidebar_close") : $this.removeClass("slidebar_close").addClass("slidebar_open"), 
            $body.css(params), mx = e.pageX, my = e.pageY, !1;
          }).one("mouseup", function() {
            $(document).off("mousemove." + namespace), f_slide = !0;
          }), !1;
        }));
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace), $this.removeData(namespace);
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
        $this.parents(options.parentClass).find(".slidebar_bottom_prev").removeClass("slidebar_close").addClass("slidebar_open"), 
        params.height = options.height;
        break;

       case "right":
       case "left":
        params.width = options.width;
      }
      $this.removeClass("slidebar_close").addClass("slidebar_open"), $this.find(".slidebar_body").stop().animate(params, options.speed, options.easing);
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
        $this.parents(options.parentClass).find(".slidebar_bottom_prev").removeClass("slidebar_open").addClass("slidebar_close"), 
        params.height = 0;
        break;

       case "right":
       case "left":
        params.width = 0;
      }
      $this.removeClass("slidebar_open").addClass("slidebar_close"), $this.find(".slidebar_body").stop().animate(params, options.speed, options.easing);
    },
    toggle: function(options) {
      var $this = $(this);
      $this.hasClass("slidebar_open") ? methods.close.call(this, options) : methods.open.call(this, options);
    }
  };
  $.fn.slidebar = function(method) {
    return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.Slidebar") : methods.init.apply(this, arguments);
  };
}(jQuery), function($) {
  var namespace = "inputcounter", methods = {
    init: function(options) {
      return options = $.extend({
        warningClass: "warning",
        errorClass: "error",
        warningCounter: "60",
        errorCounter: "65",
        maxCounter: ""
      }, options), this.each(function() {
        var _this = this, $this = $(this), data = $this.data(namespace);
        data || (options = $.extend({}, options), $this.data(namespace, {
          options: options
        }), methods.check.apply(_this), $this.bind("keydown keyup keypress change", function() {
          methods.check.apply(_this);
        }));
      });
    },
    check: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      var val = $this.val(), length = val.length;
      $this.removeClass(options.errorClass), $this.removeClass(options.warningClass), 
      options.errorCounter <= length ? $this.addClass(options.errorClass) : options.warningCounter <= length && $this.addClass(options.warningClass);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace), $this.removeData(namespace);
      });
    }
  };
  $.fn.inputcounter = function(method) {
    return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery." + namespace) : methods.init.apply(this, arguments);
  };
}(jQuery);