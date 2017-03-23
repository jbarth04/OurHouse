# Comp120 Web Engineering
# Run these two commands in your terminal to add necessary environment variables

# $ export APP_SETTINGS="config.DevelopmentConfig"
# $ export DATABASE_URL="postgresql://yourUsername:yourPassword@localhost/yourDB"

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    # SECRET_KEY = 'this-really-needs-to-be-changed'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SECRET_KEY = '\x9f\x04\xb4\x8a\x14\xb9\xd5Pn\xa0\xb4\xfe\xc3\xfdi\xfdn\xe28{\xd5\xc7\xcb\xde'


class TestingConfig(Config):
    TESTING = True
    SECRET_KEY = '\x9f\x04\xb4\x8a\x14\xb9\xd5Pn\xa0\xb4\xfe\xc3\xfdi\xfdn\xe28{\xd5\xc7\xcb\xde'