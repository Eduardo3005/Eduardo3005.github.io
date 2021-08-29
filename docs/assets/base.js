$(document).ready(function () {
  $(document).click(function () {
    // if($(".navbar-collapse").hasClass("in")){
    $(".navbar-collapse").collapse("hide");
    // }
  });

  $(".youtube-video-play").click(function () {
    $(".youtube-video-play").hide();

    $(".youtube-video").show();

    $("#video")[0].src += "?autoplay=1";
  });

  /*
  setTimeout(function () {
    var e1 = document.getElementById("ytplayer");
    e1.style.width = "100%";
    e1.style.height = "100%";
  }, 1000);
  */
});


/*
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {

    videoId: '3eD377crY1o',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
*/
