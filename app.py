from flask import Flask
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

# import created database in models.py
from models import db
db.init_app(app)

############ Do the configuration for the S3 storage bucket #############

# from flask_store import Store
# from flask import request

# store = Store()

# store.init_app(app)

# @app.route('/upload', methods=['POST', ])
# def upload():
#     provider = store.Provider(request.files.get('afile'))
#     provider.save()
#     return provider.absolute_url

############ Do the configuration for the CDN Amazon Cloud Storage #############
from flask_cdn import CDN

cdn = CDN()
cdn.init_app(app)

########## Do the configuration for Flask-Compress, works with gzip ###########
from flask_compress import Compress

compress = Compress()
compress.init_app(app)

########## Do the configuration Memcache ###########
import pylibmc
mc = app.config['CACHE_CONFIG']

###################### Import Blueprints #############################

import serializeDecimalObject
app.register_blueprint(serializeDecimalObject.serializeDecimalObject_page)

import auth
app.register_blueprint(auth.auth_page)

import user
app.register_blueprint(user.user_page)

import house
app.register_blueprint(house.house_page)

# import developer
# app.register_blueprint(developer.developer_page)

###################### Run the app #############################

@app.after_request
def add_header(response):
    response.cache_control.max_age = 300
    return response

if __name__ == "__main__":
    app.run()