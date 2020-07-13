//== multi select
//
//## Apply multiselect


(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.selectMultiple = function () {

    $(document).ready(function () {
      $.each($('select[multiple="multiple"]'), function (i, el) {
        $(el).multiselect({
          nonSelectedText: Drupal.t('Selectionner...')
        });
      });

      $('.btn.multiselect').removeClass('btn-default');

    });
  };

})(jQuery, Drupal);
