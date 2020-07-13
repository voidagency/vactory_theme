//== Youtube Video
//
//## Apply jquery.mb.YTPlayer
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.ytplayer = function () {
    $(document).ready(function () {
      var $element = $(".ytplayer");
      if (!$element.hasClass('mb_YTPlayer')) {
        var _timer = setTimeout(function() {
          $element.YTPlayer();
          clearTimeout(_timer);
        }, 3000)
      }
      $('.play-video').fancybox();
    });
  };

})(jQuery, Drupal);
