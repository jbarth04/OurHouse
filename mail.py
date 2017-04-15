from flask import Flask
import os
from flask_mail import Message, Mail
from flask import request, render_template
from flask import Blueprint 

mail_page = Blueprint('mail_page', __name__)

mail = Mail()

@mail_page.route('/contactlandlord', methods=['POST']) 

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
			return "Sent"