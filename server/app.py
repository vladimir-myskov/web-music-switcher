import os
import json
import tornado.ioloop
import tornado.web
import tornado.websocket
from sockjs.tornado import SockJSRouter, SockJSConnection

pages = {}

def register_audio_page(key, page, handler):
    if not key in pages:
        page["handler"] = handler
        pages[key] = page
    return page

def unregister_audio_page(key):
    del pages[key]


class PagesHandler(tornado.web.RequestHandler):
    def get(self):
        self.write(str(pages))

class SeniorHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("senior.html")


class AudioPageHandler(SockJSConnection):
    def open(self):
        print "OPEN"
        pass

    def on_message(self, message):
        print message
        message = json.loads(message)
        method, data = "on_"+ message["event"], message["data"]
        try:
            getattr(self, method)(data)
        except:
            pass

    def on_close(self):
        unregister_audio_page(self.page["key"])

    def on_register(self, data):
        print data
        key = data["key"]
        self.page = register_audio_page(key, data, self)

    def on_page_settings(self, data):
        for key,value in data.iteritems():
            self.page[key] = value

    def on_senior_prev(self, data):
        self.broadcast([page["handler"] for page in pages.values()], {
                "event":"audio_prev",
                "data": {}
            }
        )

    def on_senior_next(self, data):
        self.broadcast([page["handler"] for page in pages.values()], {
                "event":"audio_next",
                "data": {}
            }
        )

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static")
}

AudioPageRouter = SockJSRouter(AudioPageHandler, '/websocket')

application = tornado.web.Application([
    (r"/pages", PagesHandler),
    #(r"/websocket",AudioPageHandler),
    (r"/senior",SeniorHandler),
  ]+AudioPageRouter.urls,
  debug=True, **settings)

if __name__ == "__main__":

    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
