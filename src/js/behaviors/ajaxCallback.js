//== reskin select picker after ajax callback
//
//##
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.ajaxCallback = {
      attach: function(context, settings) {

        $(context).find('select').once('reSkinSelect').each(function(){
          Drupal.vactory.utility.selectpicker();
        });

      }
    };

})(jQuery, Drupal);
