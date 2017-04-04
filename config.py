# Comp120 Web Engineering
# Run these two commands in your terminal to add necessary environment variables

# $ export APP_SETTINGS="config.DevelopmentConfig"
# $ export DATABASE_URL="postgresql://yourUsername:yourPassword@localhost/yourDB"
# $ export SESSIONS_KEY=""
# $ export S3_ACCESS_KEY="ABCDEFG12345"
# $ export S3_SECRET_KEY="ABCDEFG12345"
# $ export CDN_DOMAIN="abcde12345.cloudfront.net"
# $ export FIREBASE_SECRET="abcde12345"
# $ export FIREBASE_DOMAIN="https://your_storage.firebaseio.com"

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True

    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

    # S3 bucket configuration - for static content
    STORE_PROVIDER = 'flask_store.providers.s3.S3Provider'
    STORE_DOMAIN = 'http://s3-us-west-2.amazonaws.com/ourhouse-s2017/'
    STORE_S3_REGION = 'us-west-2'
    STORE_S3_BUCKET = 'ourhouse-s2017'
    STORE_S3_ACCESS_KEY = os.environ['S3_ACCESS_KEY']
    STORE_S3_SECRET_KEY = os.environ['S3_SECRET_KEY']
    # STORE_PATH = ''

    # Amazon cloud storage
    CDN_DOMAIN = os.environ['CDN_DOMAIN']

    # For Flask-Compression types
    COMPRESS_MIMETYPES = [
                            'text/html',
                            'text/css',
                            'text/xml',
                            'text/jsx',
                            'application/json',
                            'application/javascript'
                         ]

    #Firebase Authentication
    FIREBASE_SECRET = os.environ['FIREBASE_SECRET']
    FIREBASE_DOMAIN = os.environ['FIREBASE_DOMAIN']

class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ['SESSIONS_KEY']


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SECRET_KEY = os.environ['SESSIONS_KEY']


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SECRET_KEY = '\x9f\x04\xb4\x8a\x14\xb9\xd5Pn\xa0\xb4\xfe\xc3\xfdi\xfdn\xe28{\xd5\xc7\xcb\xde'


class TestingConfig(Config):
    TESTING = True
    SECRET_KEY = '\x9f\x04\xb4\x8a\x14\xb9\xd5Pn\xa0\xb4\xfe\xc3\xfdi\xfdn\xe28{\xd5\xc7\xcb\xde'