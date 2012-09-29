(function(global) {
  window.addEventListener("load", function(){
    var prev_button = document.getElementById("prev_button"),
        next_button = document.getElementById("next_button");
    prev_button.addEventListener("click", function(){
      messanger.send("senior_prev",{});
    });

    next_button.addEventListener("click", function(){
      messanger.send("senior_next",{});
    });
  });
})(window);