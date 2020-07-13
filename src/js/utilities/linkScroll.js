/**
 * Created by void on 10/09/2018.
 */
/**
 * @file
 */
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.linkscroll = function () {
    $(document).ready(function () {

      // scroll to the bottom of tabs slider
      $('.link-scroll').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $(this).parents('.paragraph').offset().top + $(this).parents('.paragraph').outerHeight(true)
        }, 300);
      });

    });
  };

})(jQuery, Drupal);

