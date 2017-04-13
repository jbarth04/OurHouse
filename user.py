## user.py
## contains routes pertaining to users: sign-up and user profile

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

user_page = Blueprint('user_page', __name__)

import json

import serializeDecimalObject

@user_page.route("/signup", methods=['GET', 'POST'])

#FUNCTION TO SUBMIT NEW USER, will need to handle postgres errors 
#will need to check for users of other types!!!!
def signup():
    if request.method == 'POST':
        if request.form['UserType'] == 'Landlord': 
            FirstName = request.form['FirstName']
            LastName = request.form['LastName']
            PhoneNum = request.form['PhoneNum']
            Email = request.form['Email']
            user = Landlord(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
            db.session.add(user)
        elif request.form['UserType'] == 'Student':
            FirstName = request.form['FirstName']
            LastName = request.form['LastName']
            PhoneNum = request.form['PhoneNum']
            Email = request.form['Email']
            user = Student(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
            db.session.add(user)
        #Handling SQLalchemy errors when a user added has the same email address (already exists)
        # http://docs.sqlalchemy.org/en/latest/core/exceptions.html
        try:
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            return jsonify([{'status':400, 'message':'A user with this email already exists.'}])
        return jsonify([{'status':201}])
    else:
        return render_template('signup.html')

@user_page.route("/profile", methods=['GET'])
def profile():
    if 'username' in session:
        email = session['username']
        user = Student.query.filter_by(Email=email).first()
        userType = "Student"
        if user == None:
            user = Landlord.query.filter_by(Email=email).first()
            userType = "Landlord"
        dictUser = user.as_dict_JSON()
        dictUser['Type'] = userType
        jsonUser = json.dumps(dictUser, default=serializeDecimalObject.defaultencode)
        if userType == "Landlord":
            landlordId = dictUser["Id"]
            houses = House.query.filter_by(LandlordId=landlordId).all()
            allHouses = [h.as_dict() for h in houses]
            properties = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
        else: 
            properties = []
        usertype = {"type": session['usertype']}
        return render_template('profile.html', user=jsonUser, properties=properties, usertype=usertype)
    else:
        return redirect(url_for('auth_page.index'))

@user_page.route("/profile_edit", methods=['GET', 'PUT'])
def editProfile():
    if 'username' in session:
        if request.method == 'GET':
            email = session['username']
            user = Student.query.filter_by(Email=email).first()
            userType = "Student"
            if user == None:
                user = Landlord.query.filter_by(Email=email).first()
                userType = "Landlord"
            dictUser = user.as_dict_JSON()
            dictUser['Type'] = userType
            jsonUser = json.dumps(dictUser, default=serializeDecimalObject.defaultencode)
            usertype = {"type": session['usertype']}
            return render_template('edit_profile.html', user=jsonUser, usertype=usertype)
        elif request.method == 'PUT':
            NewFirstName = request.form['FirstName']
            NewLastName = request.form['LastName']
            NewPhoneNum = request.form['PhoneNum']
            email = session['username']
            user = Student.query.filter_by(Email=email).first()
            if user == None:
                user = Landlord.query.filter_by(Email=email).first()
            #May want better logic about what to change -- does it make a difference?
            user.FirstName = NewFirstName
            user.LastName = NewLastName
            user.Phone = NewPhoneNum
            try:
                db.session.commit()
            except exc.IntegrityError:
                db.session.rollback()
                return jsonify([{'status':400, 'message':'A user with this email already exists.'}])
            return jsonify([{'status':200}])
    else:
        return redirect(url_for('auth_page.index'))


