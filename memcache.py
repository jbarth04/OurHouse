########## Do the configuration Memcache ###########

# In order to avoid circular dependency, make memcache object its own blueprint

from flask import Flask
import pylibmc
import os

import config

from flask import Blueprint
memcache_page = Blueprint('memcache_page', __name__)


# 'APP_SETTINGS' is in the form config.SOME_CONFIG CLASS
_config_setting = os.environ['APP_SETTINGS']

_config_arr = _config_setting.split(".")

# Trying to get just the SOME_CONFIG_CLASS part (e.g. DevelopmentConfig)
_config_class = getattr(config, _config_arr[-1])

mc = getattr(_config_class, 'CACHE_CONFIG')
