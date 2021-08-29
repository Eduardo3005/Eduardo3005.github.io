$(document).ready(function () {
  $(document).click(function () {
    // if($(".navbar-collapse").hasClass("in")){
    $(".navbar-collapse").collapse("hide");
    // }
  });

  $("#playvideo").click(function () {
    $(".youtube-video-play").hide();

    $(".youtube-video").show();

    setTimeout(function () {

    }, 2000);


    $("#video")[0].src += "?autoplay=1";
  });
});

