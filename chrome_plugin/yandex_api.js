(function(global) {
  global.apiInitializer["yandex"] = function(){
    console.log("yandex");
    var prev_button = document.querySelector(".js-player-prev"),
        next_button = document.querySelector(".js-player-next");
    messanger.bind("audio_prev", function() {
      prev_button.click();

    });
    messanger.bind("audio_next", function() {
      next_button.click();
    });
  };
})(window);