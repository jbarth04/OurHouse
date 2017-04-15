from flask import Flask
from flask_mail import Mail
import os

################### Initial Config ######################

app = Flask(__name__)

# get database info from secret config.py file, NOT pushed to github or heroku
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# make sure we got the database URL
if app.config['SQLALCHEMY_DATABASE_URI'] == None:
    print "Need database config"
    sys.exit(1)

############ Do the configuration for the database #############
from models import db
db.init_app(app)

############ Do the configuration for the S3 storage bucket #############
from photo import store
store.init_app(app)

############ Do the configuration for email #############
from mail import mail
mail.init_app(app)

############ Do the configuration for the CDN Amazon Cloud Storage #############
from flask_cdn import CDN

if app.config['IS_CDN_ENABLED'] == 'True':
    cdn = CDN()
    cdn.init_app(app)

########## Do the configuration for Flask-Compress, works with gzip ###########
from flask_compress import Compress

compress = Compress()
compress.init_app(app)

###################### Import Blueprints #############################

import memcache
app.register_blueprint(memcache.memcache_page)

import serializeDecimalObject
app.register_blueprint(serializeDecimalObject.serializeDecimalObject_page)

import auth
app.register_blueprint(auth.auth_page)

import user
app.register_blueprint(user.user_page)

import house
app.register_blueprint(house.house_page)

import developer
app.register_blueprint(developer.developer_page)

import photo
app.register_blueprint(photo.photo_page)

import review
app.register_blueprint(review.review_page)

import mail
app.register_blueprint(mail.mail_page)

###################### Run the app #############################

if __name__ == "__main__":
    app.run()
