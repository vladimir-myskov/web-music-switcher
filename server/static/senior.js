(function(global) {
  window.addEventListener("load", function(){
    var prev_button = document.getElementById("prev_button"),
        next_button = document.getElementById("next_button");
    prev_button.addEventListener("click", function(){
      messanger.send("senior_prev",{key: key});
    });

    next_button.addEventListener("click", function(){
      messanger.send("senior_next",{key: key});
    });
  });
})(window);