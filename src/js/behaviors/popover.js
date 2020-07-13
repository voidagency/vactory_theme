// Bootstrap popover.

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.bootstrap_popover = {
    attach: function (context, setting) {
      if ($.fn.popover) {
        $("[data-toggle='popover']").popover();
      }
    }
  };

})(jQuery, Drupal);
