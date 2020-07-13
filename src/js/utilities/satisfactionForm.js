(function ($, Drupal) {
    "use strict";
  
    Drupal.vactory.utility.satisfactionForm = function () {
        $(document).ready(function () {
            //satisfaction range by input radio  
            $('.satisfaction-range .form-radio').each(function () {
                if($(this).is(':checked')) {
                    $(this).parents('.radio').addClass('active');
                }
            });
            
            $('.satisfaction-range .form-radio').on('click',function(){
                $(this).parents('.satisfaction-range').find('.radio').removeClass('active');
                $(this).parents('.radio').addClass('active');
            });
        });
    }
})(jQuery, Drupal);