from flask import Flask
import os
from flask_mail import Message, Mail
from flask import request, render_template
from flask import Blueprint 

import app 

mail_page = Blueprint('mail_page', __name__)

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
			LandlordFName = request.form['landlordfname']
			UserEmail = request.form['useremail']
			EmailMessage = request.form['message']
			msg = Message('Someone is interested in your property!', sender=('The OurHouse Team', 
			'comp120frhj@gmail.com'), recipients=[LandlordEmail])
			msg.html = render_template('Hybrid/stationery-hybrid.html', useremail=UserEmail, emailmessage=EmailMessage, firstname=LandlordFName)
			mail.send(msg)
			return render_template('houses.html')