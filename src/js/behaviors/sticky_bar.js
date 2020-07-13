(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.sticky_bar = {
    attach: function () {

      $(document).ready(function () {

        // Variables 
        var _tab = $('.bar-tabs');
        var lastScroll2 = 0;
        var tabOffset = (_tab.length) ? _tab.offset().top + _tab.outerHeight(true) : null;
        var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        /*
        var myTime = setTimeout(function(){
          tabOffset = $('.bar-tabs').offset().top + $('.bar-tabs').outerHeight(true);
          clearTimeout(myTime);
        }, 500);*/


        // Fixed the block of sticky_bar when scroll to bottom 
        $(window).on('scroll', function () {
          if (_tab.length) {
            var windowScrollTop = $(window).scrollTop();
            if (windowScrollTop > tabOffset) {
              _tab.addClass('sticky-bar-tabs');
              if (windowScrollTop < lastScroll2) {
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-bottom').addClass('sticky-bar-top');
                  clearTimeout(_timer);
                }, 300);

              }
              else {
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-top').addClass('sticky-bar-bottom');
                  clearTimeout(_timer);
                }, 300);

              }
            }
            else {
              _tab.removeClass('sticky-bar-bottom').removeClass('sticky-bar-top').removeClass('sticky-bar-tabs');
            }
            lastScroll2 = windowScrollTop;
          }
        });

        // The click of simulation tabs
        _tab.find('.bar-tab-head li').on('click', function () {
          if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
            var target = $(this).find('> a').attr('data-id');
            $(target).addClass('show').siblings().removeClass('show');
            if (isDevice || matchMedia('(max-width: 768px)').matches) {
              $(target).addClass('active is-active').siblings().removeClass('active is-active');
              $('body').addClass('overflow-y');
              $('.vh-sticky-tab-bar-close').addClass('is-open');
            }
          }
          else {
            if (isDevice || matchMedia('(max-width: 768px)').matches) {
              //
              $(this).removeClass('active');
              var target = $(this).find('> a').attr('data-id');
              $(target).removeClass('show active is-active');
              //
              $(target).removeClass('active is-active');
              $('body').removeClass('overflow-y');
              $('.vh-sticky-tab-bar-close').removeClass('is-open');
            }
          }
        });

        $('.vh-sticky-tab-bar-close > a').on('click', function (event) {
          event.preventDefault();
          _tab.find('.bar-tab-head li ').removeClass('active');
          _tab.find('.bar-tab-content > div').removeClass('show active is-active');
          $('.vh-sticky-tab-bar-close').removeClass('is-open');
        })
      });

    }
  };
})(jQuery, Drupal);
