#!/usr/bin/env python
from conf import config
from flask import Flask
from flask.ext.assets import Environment, Bundle
import home

blueprints = (home.bp,)

app = Flask(__name__)
[app.register_blueprint(bp) for bp in blueprints]

assets = Environment(app)
assets.register('js', Bundle(
    'js/vendor/jquery-1.7.1.js',
    'js/vendor/jquery.proximity.js',
    'js/animations.js',
    'js/canvas.js',
    'js/frost.js',
    output='gen/common.js'))

assets.register('css', Bundle(
    'css/objects.css',
    'css/frost.css',
    output='gen/common.css'))


if __name__ == '__main__':
    app.run(
        host=config.get('app', 'address'),
        port=config.getint('app', 'port'),
        debug=config.getboolean('app', 'debug'))