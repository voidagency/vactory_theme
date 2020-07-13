//== Datepicker
//
//## Apply datepicker

(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.datepicker = function () {

    $(document).ready(function () {

      $('.datepicker').datepicker({
        language: Drupal.vars.vactory.lang,
        autoHide: true
      });

      // Datepicker example 1.
      $('#datepicker-example-1').datepicker({});

      // Datepicker example 2.
      $('#datepicker-example-2').datepicker({});

    });
  };

})(jQuery, Drupal);
