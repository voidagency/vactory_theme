//== select picker
//
//## Apply selectpicker


(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.selectpicker = function () {

    $(document).ready(function () {

      var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      var options = {style: null,};

      $.each($('select.selectpicker:not([multiple="multiple"]), select.skinned-select, select.lang-dropdown-select-element'), function (i, el) {
        if ($(el).hasClass('lang-dropdown-select-element')) {
          $(el).selectpicker({
            style: null,
            dropupAuto : true,// to force the dropdown to always open down
          });
        }
        else {
          $(el).selectpicker({
            style: 'custom'
          });
        }
      });

      $('select.selectpicker:not([multiple="multiple"]), select.skinned-select').each(function (index, value) {
        ($(value).is(':visible') && $(value).hasClass('js-autocomplete')) ? $(value).attr('data-live-search', true).attr('data-none-results-text', Drupal.t('Aucun résultat')) : null;
        ($(value).is(':visible')) ? $(value).selectpicker() : null;
      });

      $('select:not(.skinned-select):not(.selectpicker):not(.lang-dropdown-select-element)').each(function () {
        if ($(this).attr('data-placeholder-value')) {
          $(this).find('option[value="none"]').text($(this).attr('data-placeholder-value'));
        }
        $(this).parent().addClass('group-select');
        if (!($(this).siblings().is("span"))) {
          $(this).parent().append("<span class='selected-option'> " + $(this).find("option:selected").text() + "</span>");
        }
      });
      $('select:not(.skinned-select):not(.selectpicker):not(.lang-dropdown-select-element)').change(function () {
        var str = $(this).find("option:selected").text();
        $(this).parent().find(".selected-option").text(str);
      });


    });
  };

})(jQuery, Drupal);
