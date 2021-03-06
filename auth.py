## auth.py
## contains routes for authentication: login and logout

from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal
from sqlalchemy import exc

import os

# import created database in models.py and import the tables
from models import db
from models import Student
from models import Landlord
from models import House
from models import Review

from flask import Blueprint

auth_page = Blueprint('auth_page', __name__)

import json

# Login route
@auth_page.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'username' in session:
            return jsonify([{'status':200}])
        else:
            Email = request.form['email']
            Password = request.form['password']
            #Will use firebase for authentication so not checking passwords here
            someStudent = Student.query.filter_by(Email=Email).first()
            someLandlord = Landlord.query.filter_by(Email=Email).first()
            if (someStudent == None and someLandlord == None) or Email == '':
                return jsonify([{'status':400, 'message':'Username/email does not exist. Please try again.'}])

            if (someStudent != None):
                if (someStudent.check_password(Password) == True):
                    session['username'] = Email
                    session['usertype'] = "Student"
                    return jsonify([{'status':200}])
                else:
                    return jsonify([{'status':400, 'message':'Password does not match email username'}])                    

            if (someLandlord != None):
                if (someLandlord.check_password(Password) == True):
                    session['username'] = Email
                    session['usertype'] = "Landlord"
                    return jsonify([{'status':200}])
                else:
                    return jsonify([{'status':400, 'message':'Password does not match email username'}])
    else:
        if 'username' in session:
            return redirect(url_for('house_page.houses'))
        else:
            return render_template('index.html')

# Logout route
@auth_page.route("/logout", methods=['GET'])
def logout():
    session.pop('username', None)
    session.pop('usertype', None)
    # changed  from just 'index', which raised an error when refactoring to blueprints
    return redirect(url_for('auth_page.index'))
