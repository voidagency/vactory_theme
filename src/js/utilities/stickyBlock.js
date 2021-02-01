(function ($, Drupal) {
  "use strict";

  Drupal.vactory.utility.stickyBlock = function () {
    $(document).ready(function () {
      var $stickyBloc = $('.sticky-bloc');
      if ($stickyBloc.length && matchMedia('(min-width: 992px)').matches) {
        $stickyBloc.each(function(e) {
          var _stickyBloc = $(this);
          var _stickyBlocHeight = _stickyBloc.height();
          var _stickyBlocOffset = _stickyBloc.offset().top + _stickyBlocHeight;

          $(window).scroll(function() {
            var _isStickyHeight = _stickyBloc.height();
            if ( $(window).scrollTop() > _stickyBlocOffset + 200 ) {
              _stickyBloc.parent().height(_stickyBlocHeight);
              _stickyBloc.find('iframe').height(_isStickyHeight);
              _stickyBloc.removeClass('sticky').addClass('sticky-back');
              _stickyBloc.addClass('sticky');
            } else {
              _stickyBloc.removeClass('sticky').removeClass('sticky-back');
              _stickyBloc.parent().height("auto");
              _stickyBloc.find('iframe').height(_stickyBlocHeight);
            };
          });

        });
      }
    });
  };
})(jQuery, Drupal);
