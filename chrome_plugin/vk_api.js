(function(global) {
  var prev_button = document.getElementById("ac_prev"),
      next_button = document.getElementById("ac_next");
  messanger.bind("audio_prev", function() {
    prev_button.click();

  });
  messanger.bind("audio_next", function() {
    next_button.click();
  });
})(window);