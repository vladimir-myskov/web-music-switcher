(function(global) {
  window.addEventListener("load", function(){
    var prev_button = document.getElementById("ac_prev"),
        next_button = document.getElementById("ac_next");
    messanger.bind("audio_prev", function() {
      alert("audio_prev");
      prev_button.click();

    });
    messanger.bind("audio_next", function() {
      alert("audio_next");
      next_button.click();
    });
  });
})(window);