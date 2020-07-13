//== Disable links
//
//## Target elements with CSS class .disablelink and prevent default.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.disableLink = function () {

    $(document).ready(function () {
      $('.disablelink').click(function (e) {
        e.preventDefault();
      });
    });
  };

})(jQuery, Drupal);
