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
    # SECRET_KEY = os.environ['SESSIONS_KEY']
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

    S3_LOCATION = 'http://your-amazon-site.amazonaws.com/'
    S3_KEY = 'YOURAMAZONKEY'
    S3_SECRET = 'YOURAMAZONSECRET'
    S3_UPLOAD_DIRECTORY = 'what_directory_on_s3'
    S3_BUCKET = 's3_bucket_name'


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