(function(global) {
  var server = "http://192.168.1.4:8888",
    ws = new SockJS("http://192.168.1.4:8888/websocket");
    console.log(global);

  var Messanger = function(connection) {
      var callbacks = {},
        that = this;

      this.bind = function(event_name, callback) {
        callbacks[event_name] = callbacks[event_name] || [];
        callbacks[event_name].push(callback);
        return this; // chainable
      };

      this.send = function(event_name, event_data) {
        var payload = JSON.stringify({
          event: event_name,
          data: event_data
        });
        connection.send(payload); // <= send JSON data to socket server
        return this;
      };

      // dispatch to the right handlers
      connection.onmessage = function(evt) {
        console.log(evt);
        var json = evt.data;
        dispatch(json.event, json.data);
      };

      var dispatch = function(event_name, message) {
        console.log([event_name, message]);
          var chain = callbacks[event_name];
          if (typeof chain == 'undefined') return; // no callbacks for this event
          for (var i = 0; i < chain.length; i++) {
            chain[i](message)
          }
        }
    };
  var messanger = new Messanger(ws);
  console.log(messanger);
  global.messanger = messanger;

  ws.onopen = function() {
    chrome.storage.sync.get("default_key", function(data){
      global.uniqKey = data.default_key || new Date().getTime()
      messanger.send("register", {
        "key": global.uniqKey
      });
    });
  }

  global.apiInitializer = {}
  var hostToInitializer = {
    "music.yandex.ru":"yandex",
    "vk.com":"vkontakte",
    "www.youtube.com":"youtube"
  }

  window.addEventListener("load",function(){
    console.log("load");

    var ii = hostToInitializer[window.location.host];
    console.log(ii);
    global.apiInitializer[ii]();
  });


})(window);