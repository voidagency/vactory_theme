//== Youtube Video
//
//## Apply jquery.mb.YTPlayer
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.ytplayer = function () {
    $(document).ready(function () {
      var $element = $(".ytplayer"),
        isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isDevice || matchMedia('(min-width: 992px)').matches) {
          if (!$element.hasClass('mb_YTPlayer')) {
            var _timer = setTimeout(function() {
              $element.YTPlayer();
              clearTimeout(_timer);
            }, 4000);
          }
        }
      $('.play-video').fancybox();
    });
  };

})(jQuery, Drupal);
