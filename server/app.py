import os
import json
import tornado.ioloop
import tornado.web
import tornado.websocket

pages = {}

def register_audio_page(key, page, handler):
    if not key in devices:
        page["handler"] = handler
        pages[key] = page
    return page

def unregister_audio_page(key):
    del pages[key]


class PagesHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(str(pages))

class AudioPageHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print "OPEN"
        pass

    def on_message(self, message):
        message = json.loads(message)
        method, data = "on_"+ message["event"], message["data"]
        try:
            getattr(self, method)(data)
        except:
            pass

    def on_close(self):
        unregister_audio_page(self.page["key"])

    def on_register(self, data):
        key = data["key"]
        self.page = register_audio_page(key, data, self)

    def on_page_settings(self, data):
        for key,value in data.iteritems():
            self.page[key] = value


application = tornado.web.Application([
    (r"/devices", PagesHandler),
    (r"/websocket",AudioPageHandler),
],debug=True)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
