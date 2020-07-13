//== Go TOP Sticky Button.
//
//## Show or hide the sticky footer button
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.gotoStickyButton = function () {
    $(document).ready(function () {
      var $element = $('.vf-go-back-top'),
        $document = $('html, body');

      $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
          $element.fadeIn(200);
        }
        else {
          $element.fadeOut(200);
        }
      });

      // Animate the scroll to top.
      $element.click(function (event) {
        event.preventDefault();
        $document.animate({scrollTop: 0}, 300);
      });
    });
  };

})(jQuery, Drupal);
