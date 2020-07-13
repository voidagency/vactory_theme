//== WOW
//
//## WOW CSS animation as you scroll down a page.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.wow = function () {
    $(document).ready(function () {

      var $wow = $('.wow');

      if (Drupal.vars.vactory.is_rtl) {
        $wow.each(function() {
          var _this = $(this);
          if (_this.hasClass('fadeInLeft')) {
            _this.removeClass('fadeInLeft').addClass('fadeInRight');
          } else if (_this.hasClass('fadeInRight')) {
            _this.removeClass('fadeInRight').addClass('fadeInLeft');
          }
        });
      }

      var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true,
        callback: function (box) {
          if ($(box).find('.js-number-animate').length) {
            goToNumber($(box).find('.js-number-animate'));
          }
        }
      });
      wow.init();
    });
  };

})(jQuery, Drupal);
