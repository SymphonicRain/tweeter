$(document).ready(function() {

  $(".errorLong").slideUp(0);
  $(".errorShort").slideUp(0);
  $("section.new-tweet").slideUp(0);
  $(".scroll").hide();

  $(".right").on("click", () =>{
    const $section = $("section.new-tweet");
    if ($section.is(":visible")) {
      $section.slideUp();
    } else {
      $section.slideDown(200);
      $section.find("textarea").focus();
    }
  });

  $(window).scroll(function() {
    if ($(document).scrollTop() > 200) {
      $(".scroll").show();
    }
    if ($(document).scrollTop() <= 200) {
      $(".scroll").hide();
    }
  });

  $(".scroll").on("click", () => {
    const $section = $("section.new-tweet");
    $section.slideDown(200);
    $section.find("textarea").focus();
  });


});