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

if app.config['IS_CDN_ENABLED'] == 'True':
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

import developer
app.register_blueprint(developer.developer_page)

# import mail
# app.register_blueprint(mail.mail_page)

# import tests
# app.register_blueprint(tests.tests_page)

###################### Mail testing ############################

from flask import Flask
import os
from flask_mail import Message, Mail
from flask import request, render_template
from flask import Blueprint 
	
# mail_page = Blueprint('mail_page', __name__)

app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = os.environ['EMAIL_ACCOUNT'],
	MAIL_PASSWORD = os.environ['EMAIL_PASSWORD']
	)

mail = Mail(app)

@app.route('/contactlandlord', methods=['POST']) 

def sendMessage(): 
		if request.method == 'POST':
			LandlordEmail = request.form['landlordemail']
			LandlordFName = request.form['landlordfname']
			UserEmail = request.form['useremail']
			EmailMessage = request.form['message']
			msg = Message('Someone is interested in your property!', sender=('The OurHouse Team', 
			'comp120frhj@gmail.com'), recipients=[LandlordEmail])
			msg.html = render_template('Hybrid/stationery-hybrid.html', useremail=UserEmail, emailmessage=EmailMessage, firstname=LandlordFName)
			mail.send(msg)
			return "sent"
###################### Run the app #############################

if __name__ == "__main__":
    app.run()
