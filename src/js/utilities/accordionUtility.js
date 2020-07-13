// accordion utilities
//==

(function ($, Drupal) {
  "use strict";

  // accordion scroll
  Drupal.vactory.utility.accordionScroll = function () {
    $(document).ready(function () {

      $('.collapse').on('shown.bs.collapse', function (e) {
        var $headerHeight = $('.vh-header').outerHeight(),
          $panel = $(this).closest('.card'),
          $scrollOffset = $headerHeight;
        if (matchMedia("(max-width: 991px)").matches) {
          $scrollOffset = 0;
        }
        $('html,body').animate({
          scrollTop: $panel.offset().top
        }, 300);
      });

    });
  };

  // initialize slick slider inside accordion
  Drupal.vactory.utility.accordionSlider = function () {
    $(document).ready(function () {
      // initialization
      $('.collapse').on('show.bs.collapse', function () {
        var _slider = $(this).find('.slick-wrapper');
        if (_slider.length) {
          _slider.each(function () {
            if ($(this).hasClass('slick-initialized')) {
              return;
            }
            $(this).slick();
          });
        }
      });

      //destruction
      // comment this event to stop destruction of slick
      $('.collapse').on('hidden.bs.collapse', function () {
        var _slickSlider = $(this).find('.slick-slider');
        if (_slickSlider.length) {
          _slickSlider.each(function () {
            $(this).slick('unslick');
          });
        }
      });

    });
  };


})(jQuery, Drupal);
