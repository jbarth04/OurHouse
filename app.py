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

# testing local
from flask_store import Store
from flask import request

store = Store()

app.config['STORE_DOMAIN'] = 'http://127.0.0.1:5000'
app.config['STORE_PATH'] = '/some/path/here/'

store.init_app(app)

@app.route('/upload', methods=['POST', ])
def upload():
    provider = store.Provider(request.files.get('afile'))
    provider.save()
    return provider.absolute_url

###################### Import Blueprints #############################

import serializeDecimalObject
app.register_blueprint(serializeDecimalObject.serializeDecimalObject_page)

import auth
app.register_blueprint(auth.auth_page)

import user
app.register_blueprint(user.user_page)

import house
app.register_blueprint(house.house_page)

# import tests
# app.register_blueprint(tests.tests_page)

###################### Mail testing ############################
from flask_mail import Message, Mail

app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'comp120frhj@gmail.com',
	MAIL_PASSWORD = 'ladyengineering'
	)

mail = Mail(app)

@app.route('/contactlandlord', methods=['POST']) 

def sendMessage(): 
		if request.method == 'POST':
			LandlordEmail = request.form['landlordemail']
			UserEmail = request.form['useremail']
			EmailMessage = request.form['message']
			msg = Message('Someone is interested in your property!', sender=('The OurHouse Team', 
			'comp120frhj@gmail.com'), recipients=['rachael.robinson95@gmail.com'])
			msg.body = EmailMessage
			mail.send(msg)
			return "Sent"

###################### Run the app #############################

if __name__ == "__main__":
    app.run()
