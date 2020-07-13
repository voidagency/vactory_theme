//== Slick Slider
/**
 * arrows (boolean) : Enable Next/Prev arrows
 * dots (boolean) : Current slide indicator dots
 * slidesToShow (int) : # of slides to show at a time
 * slidesToScroll (int) : # of slides to scroll at a time
 * autoplay (boolean) : Enables auto play of slides
 * autoplaySpeed (int : 3000) : Auto play change interval
 * centerMode (boolean) : Enables centered view with partial prev/next slides.
 * Use with odd numbered slidesToShow counts. centerPadding (string: 50px) :
 * Side padding when in center mode. (px or %) dotsClass (string: slick-dots) :
 * Class for slide indicator dots container draggable (boolean) : Enables
 * desktop dragging infinite (boolean) : Infinite looping initialSlide (int) :
 * Slide to start on rtl (boolean) : Change the slider's direction to become
 * right-to-left speed (int) : Transition speed variableWidth (boolean) :
 * Disables automatic slide width calculation adaptiveHeight (boolean) : Adapts
 * slider height to the current slide prevArrow (string (html | jQuery
 * selector) | object (DOM node | jQuery object)) : Allows you to select a node
 * or customize the HTML for the "Previous" arrow. nextArrow (string (html |
 * jQuery selector) | object (DOM node | jQuery object)) : Allows you to select
 * a node or customize the HTML for the "Next" arrow. accessibility (boolean) :
 * Enables tabbing and arrow key navigation. Unless autoplay: true, sets
 * browser focus to current slide (or first of current slide set, if multiple
 * slidesToShow) after slide change. For full a11y compliance enable
 * focusOnChange in addition to this. useTransform useTransform :
 * Enable/Disable CSS Transforms cssEase (string : ease) : CSS3 easing easing
 * (string: linear) : animate() fallback easing focusOnSelect (boolean): Enable
 * focus on selected element (click) focusOnChange (boolean) : Puts focus on
 * slide after change lazyLoad (string : ondemand|progressive) : Accepts
 * 'ondemand' or 'progressive' for lazy load technique. 'ondemand' will load
 * the image as soon as you slide to it, 'progressive' loads one image after
 * the other when the page loads. pauseOnDotsHover (boolean) : Pauses autoplay
 * when a dot is hovered pauseOnFocus (boolean) ; Pauses autoplay when slider
 * is focussed pauseOnHover (boolean) : Pauses autoplay on hover swipe
 * (boolean) :  Enables touch swipe
 *
 *
 *
 * We manage slider on our twig with data. exemple:
 * <div class="vf-slick-slider" data-dots="true" data-arrows="true"
 * data-toshow="3" data-mobile-arrows="false"></div>
 *
 */

//## Initialize slider


(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.sliders = function () {

    $(document).ready(function () {

      // Variables
      var $slickSlider = $('.vf-slick-slider'),
        rtlMode = Drupal.vars.vactory.is_rtl,
        resizeTimer,
        prevArrow = Drupal.theme('vButtonMarkup', {
          'css': rtlMode ? 'slick-next' : 'slick-prev',
          'icon': rtlMode ? 'icon-chevron-right' : 'icon-chevron-left',
          'ariaLabel': rtlMode ? 'next-slide' : 'previous-slide'
        }),
        nextArrow = Drupal.theme('vButtonMarkup', {
          'css': rtlMode ? 'slick-prev' : 'slick-next',
          'icon': rtlMode ? 'icon-chevron-left' : 'icon-chevron-right',
          'ariaLabel': rtlMode ? 'previous-slide' : 'next-slide'
        });

      // function to slick slider on desktop | mobile
      function initSlider() {
        $slickSlider.each(function (index, value) {
          var _IS_MOBILE_VIEW = (matchMedia("only screen and (max-width: 992px)").matches) ? true : false,
            $slider = $(value),
            _slidesToShow = ($(value).data('toshow') !== undefined) ? $(value).data('toshow') : 1, // number slides to show on desktop
            $settings_slider = {
              rtl: rtlMode,
              dots: ($slider.data('dots') !== undefined) ? $slider.data('dots') : true,
              arrows: ($slider.data('arrows') !== undefined) ? $slider.data('arrows') : true,
              infinite: ($slider.data('infinite') !== undefined) ? $slider.data('infinite') : true,
              slidesToShow: ($slider.data('toshow') !== undefined) ? $slider.data('toshow') : 1,
              slidesToScroll: ($slider.data('toscroll') !== undefined) ? $slider.data('toscroll') : 1,
              autoplay: ($slider.data('autoplay') !== undefined) ? $slider.data('autoplay') : false,
              autoplaySpeed: ($slider.data('autoplayspeed') !== undefined) ? $slider.data('autoplayspeed') :3000,
              adaptiveHeight: ($slider.data('adaptiveheight') !== undefined) ? $slider.data('adaptiveheight') : false,
              centerMode: $($slider.data('centermode') !== undefined) ? $slider.data('centermode') : false,
              centerPadding: $($slider.data('centerpadding') !== undefined) ? $slider.data('centerpadding') : "50px",
              variableWidth: $($slider.data('variablewidth') !== undefined) ? $slider.data('variablewidth') : false,
              cssEase: 'cubic-bezier(0.585, -0.005, 0.635, 0.920)',
              useTransform: ($slider.data('usetransform') !== undefined) ? $slider.data('usetransform'): true,
              accessibility: ($slider.data('accesibility') !== undefined) ? $slider.data('accesibility') :false,
              speed: ($slider.data('speed') !== undefined) ? $slider.data('speed') : 800,
              prevArrow: prevArrow,
              nextArrow: nextArrow,
              lazyLoad: ($slider.data('lazyload') !== undefined) ? $slider.data('lazyload') : 'ondemand',
              draggable: ($slider.data('draggable') !== undefined) ? $slider.data('draggable') : true,
              easing: 'linear',
              focusOnChange: false,
              focusOnSelect: false,
              pauseOnDotsHover: false,
              pauseOnFocus: true,
              pauseOnHover: true,
              swipe: ($slider.data('swipe') !== undefined) ? $slider.data('swipe') : true,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    arrows: ($slider.data('mobile-arrows') !== undefined) ? $slider.data('mobile-arrows') : false,
                    dots: ($slider.data('mobile-dots')) ? $slider.data('mobile-dots') : true,
                    slidesToShow: ($slider.data('toshow') !== undefined) ? Math.floor($slider.data('toshow')) : 1,
                    slidesToScroll: ($slider.data('toscroll') !== undefined) ? Math.floor($slider.data('toscroll')) : 1,
                    speed: ($slider.data('speed') !== undefined) ? $slider.data('speed') : 800,
                    cssEase: 'ease'
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    arrows: ($slider.data('mobile-arrows') !== undefined) ? $slider.data('mobile-arrows') : false,
                    dots: ($slider.data('mobile-dots') !== undefined) ? $slider.data('mobile-dots') : true,
                    infinite: ($slider.data('mobile-infinite') !== undefined) ? $slider.data('mobile-infinite') : true,
                    slidesToShow: ($slider.data('mobile-toshow') !== undefined) ? $slider.data('mobile-toshow') : 1,
                    slidesToScroll: ($slider.data('mobile-toscroll') !== undefined) ? $slider.data('mobile-toscroll') : 1,
                    autoplay: ($slider.data('mobile-autoplay') !== undefined) ? $slider.data('mobile-autoplay') : false,
                    adaptiveHeight: ($slider.data('mobile-adaptiveheight') !== undefined) ? $slider.data('mobile-adaptiveheight') : false,
                    centerMode: $($slider.data('mobile-centermode') !== undefined) ? $slider.data('mobile-centermode') : false,
                    centerPadding: $($slider.data('mobile-centerpadding') !== undefined) ? $slider.data('mobile-centerpadding') : "35px",
                    variableWidth: $($slider.data('mobile-variablewidth') !== undefined) ? $slider.data('mobile-variablewidth') : false,
                    appendArrows: ($slider.parent().find('.slick-controls').length > 0) ? $slider.parent().find('.slick-controls') : $slider,
                    appendDots: ($slider.parent().find('.slick-controls').length > 0) ? $slider.parent().find('.slick-controls') : $slider,
                  }
                }
              ],
            }; // Json of slick slider

          //  Lazy load images
          $slider.find('img.slick-lazyload').each(function (index, value) {
            if (matchMedia('(max-width: 768px)').matches && $(value).data('mobile') !== undefined) {
              $(value).data('lazy', $(value).data('mobile'));
            }
            else {
              $(value).data('lazy', $(value).data('desktop'));
            }
          });

          // Remove loading after load images
          $slider.on('lazyLoaded', function (event, slick, image, imageSource) {
            if($(image).parents('.loading').length > 0) {
              $(image).parents('.loading').removeClass('loading');
            }
          });


          if ($slider.data('equalheight') !== undefined && $slider.data('equalheight') !== undefined && !$slider.hasClass('slick-initialized')) {
            $slider.addClass('slick-use-equal-height')
          }


          if (($slider.find('> *').length > _slidesToShow || $slider.find('.slick-slide:not(.slick-cloned)').length > _slidesToShow) && !_IS_MOBILE_VIEW) {
            if ($slider.hasClass('vf-slick-mobile') && $slider.hasClass('slick-initialized')) {
              $slider.slick('destroy');
            }
            else if (!$slider.hasClass('slick-initialized') && !$slider.hasClass('vf-slick-mobile')) {
              $slider.slick($settings_slider);
            }
            else if (!$slider.hasClass('vf-slick-mobile') && $slider.hasClass('slick-initialized')) {
              $slider.slick('refresh');
            }
          }
          else if (_IS_MOBILE_VIEW && $slider.find(" > *").length > 1 && !$slider.hasClass('slick-initialized')) {
            $slider.slick($settings_slider);
          }
          else if (_IS_MOBILE_VIEW && $slider.hasClass('slick-initialized')) {
            $slider.slick('refresh');
          }
          else if ($slider.find('.slick-slide:not(.slick-cloned)').length <= _slidesToShow && !_IS_MOBILE_VIEW && $slider.hasClass('slick-initialized')) {
            $slider.slick('destroy');
          }
        });
      }

      // function to call all function to run after a slick change (swipe slick
      // slider or click arrow or autoplay)
      function afterSlickChange(target) {
        var _IS_MOBILE_VIEW = (matchMedia("only screen and (max-width: 992px)").matches) ? true : false;
        if (_IS_MOBILE_VIEW) {
          if (target.find('.slick-current .js-number-animate').length) {
            goToNumber(target.find('.slick-current .js-number-animate'));
          }
        }
      }

      // Call init slider on the load of page
      initSlider();

      // Call initSlider on resize of window to trigger slider on mobile or
      // destroy slider on desktop
      $(window).resize(function () {
        clearTimeout(resizeTimer); // After finish resizing
        resizeTimer = setTimeout(function () {
          initSlider();
        }, 250);
      });

      // Slick slider callback
      $slickSlider.on('afterChange', function (event, slick, currentSlide) {
        afterSlickChange($(this));
      });

    });
  };

})(jQuery, Drupal);
