#!/usr/bin/env python
from conf import config
from flask import Flask

app = Flask(__name__)

if __name__ == '__main__':
    app.run(host=config.get('app', 'address'), port=config.get('app', 'port'))