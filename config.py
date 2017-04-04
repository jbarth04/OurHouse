# Comp120 Web Engineering
# Run these two commands in your terminal to add necessary environment variables

# $ export APP_SETTINGS="config.DevelopmentConfig"
# $ export DATABASE_URL="postgresql://yourUsername:yourPassword@localhost/yourDB"
# $ export SESSIONS_KEY=""
# $ export S3_ACCESS_KEY="ABCDEFG12345"
# $ export S3_SECRET_KEY="ABCDEFG12345"
# $ export CDN_DOMAIN="abcde12345.cloudfront.net"
# $ export MEMCACHIER_SERVERS="mc3.dev.ec2.memcachier.com:11211"
# $ export MEMCACHIER_USERNAME="abcde12345"
# $ export MEMCACHIER_PASSWORD="abcde12345abcde12345"

import os
basedir = os.path.abspath(os.path.dirname(__file__))

import pylibmc # for caching


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

class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ['SESSIONS_KEY']

    servers = os.environ.get('MEMCACHIER_SERVERS', '').split(',')
    user = os.environ.get('MEMCACHIER_USERNAME', '')
    passwd = os.environ.get('MEMCACHIER_PASSWORD', '')

    CACHE_CONFIG = pylibmc.Client(servers, binary=True,
                    username=user, password=passwd,
                    behaviors={
                      # Faster IO
                      "tcp_nodelay": True,

                      # Keep connection alive
                      'tcp_keepalive': True,

                      # Timeout for set/get requests
                      'connect_timeout': 2000, # ms
                      'send_timeout': 750 * 1000, # us
                      'receive_timeout': 750 * 1000, # us
                      '_poll_timeout': 2000, # ms

                      # Better failover
                      'ketama': True,
                      'remove_failed': 1,
                      'retry_timeout': 2,
                      'dead_timeout': 30,
                    })


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SECRET_KEY = os.environ['SESSIONS_KEY']

    servers = os.environ.get('MEMCACHIER_SERVERS', '').split(',')
    user = os.environ.get('MEMCACHIER_USERNAME', '')
    passwd = os.environ.get('MEMCACHIER_PASSWORD', '')

    CACHE_CONFIG = pylibmc.Client(servers, binary=True,
                    username=user, password=passwd,
                    behaviors={
                      # Faster IO
                      "tcp_nodelay": True,

                      # Keep connection alive
                      'tcp_keepalive': True,

                      # Timeout for set/get requests
                      'connect_timeout': 2000, # ms
                      'send_timeout': 750 * 1000, # us
                      'receive_timeout': 750 * 1000, # us
                      '_poll_timeout': 2000, # ms

                      # Better failover
                      'ketama': True,
                      'remove_failed': 1,
                      'retry_timeout': 2,
                      'dead_timeout': 30,
                    })


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SECRET_KEY = '\x9f\x04\xb4\x8a\x14\xb9\xd5Pn\xa0\xb4\xfe\xc3\xfdi\xfdn\xe28{\xd5\xc7\xcb\xde'

    CACHE_CONFIG = pylibmc.Client(["127.0.0.1"], binary=True, 
                                    behaviors={
                                      # Faster IO
                                      "tcp_nodelay": True,

                                      # Keep connection alive
                                      'tcp_keepalive': True,

                                      # Timeout for set/get requests
                                      'connect_timeout': 2000, # ms
                                      'send_timeout': 750 * 1000, # us
                                      'receive_timeout': 750 * 1000, # us
                                      '_poll_timeout': 2000, # ms

                                      # Better failover
                                      'ketama': True,
                                      'remove_failed': 1,
                                      'retry_timeout': 2,
                                      'dead_timeout': 30,
                                    })


class TestingConfig(Config):
    TESTING = True
    SECRET_KEY = '\x9f\x04\xb4\x8a\x14\xb9\xd5Pn\xa0\xb4\xfe\xc3\xfdi\xfdn\xe28{\xd5\xc7\xcb\xde'

    CACHE_CONFIG = pylibmc.Client(["127.0.0.1"], binary=True, 
                                    behaviors={
                                      # Faster IO
                                      "tcp_nodelay": True,

                                      # Keep connection alive
                                      'tcp_keepalive': True,

                                      # Timeout for set/get requests
                                      'connect_timeout': 2000, # ms
                                      'send_timeout': 750 * 1000, # us
                                      'receive_timeout': 750 * 1000, # us
                                      '_poll_timeout': 2000, # ms

                                      # Better failover
                                      'ketama': True,
                                      'remove_failed': 1,
                                      'retry_timeout': 2,
                                      'dead_timeout': 30,
                                    })

