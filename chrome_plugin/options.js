(function(global) {
  window.addEventListener("load", function(){
    chrome.storage.sync.get("default_key", function(data){
      input = document.getElementById("default_key");
      input.value = data["default_key"]||new Date().getTime();
    });

    document.getElementById("save_button").addEventListener("click",function(){
      els = document.querySelectorAll("input:not([type=button])");
      for(var i in els) if(els.hasOwnProperty(i)){
        var input = els[i],
            tosave = {};

        tosave[input.id] = input.value;
        chrome.storage.sync.set(tosave);
      }
    });
  });

})(window);

