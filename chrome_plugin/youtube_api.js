(function(global) {
  global.apiInitializer["youtube"] = function(){
    console.log("youtube");
    var prev_button = document.getElementById("playlist-bar-prev-button"),
        next_button = document.getElementById("playlist-bar-next-button");
    messanger.bind("audio_prev", function() {
      prev_button.click();
    });
    messanger.bind("audio_next", function() {
      next_button.click();
    });
  };
})(window);

