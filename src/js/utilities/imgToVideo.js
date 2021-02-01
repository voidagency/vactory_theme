//== change img to video.
//
(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.imgtovideo = function () {
    $(document).ready(function () {
      var $video_player = $('.play-video');
      if($video_player.length) {
        $video_player.each(function(i) {
          $(this).on('click', function (e) {
            e.preventDefault();
            if ($(this).parents('.js-img-video').length) {
              $(this).addClass('loader');
              var $video_link = $(this).attr('href');
              $video_link = ($video_link.includes('watch')) ? $video_link.replace('watch?v=', 'embed/') + '?rel=0&amp;autoplay=1&controls=0&fs=0&iv_load_policy=3' : null;
              var $js_iframe2 = $('<iframe>', {
                src: $video_link,
                id: 'js-iframe-video',
                frameborder: '0',
                scrolling: 'no',
                allow: 'autoplay',
                controls: '0',
                modestbranding: '1',
                width: '100%',
                height: $(this).find('img').height() + 'px'
              });
              $(this).parent().html($js_iframe2);
            } else {
              $('.play-video').fancybox();
            }
          });
        });
      }
    });
  };
})(jQuery, Drupal);
