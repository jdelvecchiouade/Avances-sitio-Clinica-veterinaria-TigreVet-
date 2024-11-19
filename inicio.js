$(document).ready(function() {
    $('#menu-toggle').click(function() {
      $('#menu').toggleClass('show');
    });

    $(window).resize(function() {
      if ($(window).width() > 985) {
        $('#menu').removeClass('show');
      }
    });
  });