########## Do the configuration Memcache ###########

# In order to avoid circular dependency, make memcache object its own blueprint

from flask import Flask
import pylibmc
import os

# from importlib import import_module

import config

_config = getattr(config, os.environ['TEST_SETTINGS'])

# _config = import_module(os.environ['APP_SETTINGS'])

# from config import _config_type

from flask import Blueprint
memcache_page = Blueprint('memcache_page', __name__)

# _config = _config_type

# print "here"
print _config
mc = getattr(_config, 'CACHE_CONFIG')

# mc = os.environ['CACHE_CONFIG']