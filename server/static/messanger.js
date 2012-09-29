(function(global) {
  var server = "http://192.168.1.4:8888",
    ws = new WebSocket("ws://192.168.1.4:8888/websocket");

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
        var json = JSON.parse(evt.data)
        dispatch(json.event, json.data)
      };

      var dispatch = function(event_name, message) {
          var chain = callbacks[event_name];
          if (typeof chain == 'undefined') return; // no callbacks for this event
          for (var i = 0; i < chain.length; i++) {
            chain[i](message)
          }
        }
    };
  var messanger = new Messanger(ws);
  global.messanger = messanger;

  ws.onopen = function() {
    global.uniqKey = new Date().getTime();
    messanger.send("register", {
      "key": global.uniqKey
    })
  }
})(window);