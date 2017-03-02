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


class TestingConfig(Config):
    TESTING = True