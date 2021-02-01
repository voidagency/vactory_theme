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
       /**
       * Filtre multiselect sur le coté sur mobile
       * $('.btn.multiselect').removeClass('btn-default').parent('.btn-group').addClass('filter-slider'); 
       **/
      $('.btn.multiselect').removeClass('btn-default');

    });
  };

})(jQuery, Drupal);
