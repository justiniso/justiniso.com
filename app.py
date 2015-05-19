#!/usr/bin/env python
from conf import config
from flask import Flask
from frontend import home

blueprints = (home.bp,)

app = Flask(__name__)
[app.register_blueprint(bp) for bp in blueprints]

if __name__ == '__main__':
    app.run(
        host=config.get('app', 'address'),
        port=config.getint('app', 'port'),
        debug=config.getboolean('app', 'debug'))