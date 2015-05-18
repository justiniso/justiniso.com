import os
from ConfigParser import ConfigParser

OS_ENVIRON = 'CONFIG_FILE'


def get():
    config_file = os.environ[OS_ENVIRON]
    default_config_file = os.path.join(os.path.dirname(__file__), 'configurations', 'default.cfg')
    parser = ConfigParser()
    parser.read((default_config_file, config_file))
    return parser

config = get()
