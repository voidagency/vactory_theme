//== Views Date Filter
//
//## Apply datepicker > Months view mode.
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.viewsDateFilter = function () {
    $(document).ready(function () {
      $('input.js-vactory-datepicker').each(function () {
        $(this).datepicker('destroy');
        $(this).datepicker({
          language: Drupal.vars.vactory.lang,
          disableTouchKeyboard: true,
          format: "mm/yyyy",
          startView: 1,
          minViewMode: 1,
          autoclose: true
        });
      });

      // Config datepicker for date filter by years.
      $('input.js-date-year-filter').each(function () {
        $(this).datepicker('destroy');
        $(this).datepicker({
          language: Drupal.vars.vactory.lang,
          disableTouchKeyboard: true,
          format: 'yyyy',
          startView: 'years',
          minViewMode: 'years',
          autoclose: true
        });

      });
    });
  };

})(jQuery, Drupal);
