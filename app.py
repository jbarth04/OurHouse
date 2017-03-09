from flask import Flask, render_template, jsonify, request, redirect, url_for 
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal

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

# import tables
from models import Student
from models import Landlord
from models import House
from models import Review

###################### Routes #############################
import json
#####################Decimal JSON encoding ################
# http://stackoverflow.com/questions/1960516/python-json-serialize-a-decimal-
# object
# User: tesdal
class fakefloat(float):
    def __init__(self, value):
        self._value = value
    def __repr__(self):
        return str(self._value)

def defaultencode(o):
    if isinstance(o, Decimal):
        # Subclass float with custom repr?
        return fakefloat(o)
    raise TypeError(repr(o) + " is not JSON serializable")
###########################################################

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        #Check for username in database
        return jsonify([{'status':200}])
    else:
        return render_template('index.html')

@app.route("/houses", methods=['GET'])
def houses():
    houses = House.query.all()
    allHouses = [h.as_dict() for h in houses]
    jsonHouses = json.dumps(allHouses, default=defaultencode)
    return render_template('houses.html', rhouses=jsonHouses)

@app.route("/signup", methods=['GET', 'POST'])

#FUNCTION TO SUBMIT NEW USER, will need to handle postgres errors 
def signup():
	if request.method == 'POST':
		if request.form['UserType'] == 'Landlord': 
			FirstName = request.form['FirstName']
			LastName = request.form['LastName']
			PhoneNum = request.form['PhoneNum']
			Email = request.form['Email']
			landlord = Landlord(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
			db.session.add(landlord)
			db.session.commit()
			return jsonify([{'status':200}]) # Figure out if need to make get request 
		elif request.form['UserType'] == 'Student':
			FirstName = request.form['FirstName']
			LastName = request.form['LastName']
			PhoneNum = request.form['PhoneNum']
			Email = request.form['Email']
			student = Student(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
			db.session.add(student)
			db.session.commit()
			return jsonify([{'status':200}])
	else:
		return render_template('signup.html')

@app.route("/newhome", methods=['GET', 'POST'])
def newhome():
    if request.method == 'POST':
        #May not need to format types of input
        LandlordFName = request.form['landlordFName'].encode('ascii', 'ignore')
        LandlordLName = request.form['landlordLName'].encode('ascii', 'ignore')
        LandlordEmail = request.form['landlordEmail']
        print LandlordFName
        print LandlordLName
        print LandlordEmail
        Address1 = request.form['address1'].encode('ascii', 'ignore')
        Address2 = request.form['address2'].encode('ascii', 'ignore')
        City = request.form['city'].encode('ascii', 'ignore')
        State = request.form['state'].encode('ascii', 'ignore')
        Zipcode = request.form['zip']	# parseFloat deprecated 
        Rooms = int(request.form['bedrooms'])
        ParkingSpots = int(request.form['parking'])
        MonthlyRent = int(request.form['rent'])
        UtilitiesIncluded = True if request.form['utilities'] == 'true' else False
        Laundry = True if request.form['laundry'] == 'true' else False
        Pets = True if request.form['pets'] == 'true' else False
        Latitude = request.form['latitude']
        Longitude = request.form['longitude']
        DistFromCC = request.form['disttocc']

        someLandlord = Landlord.query.filter_by(Email=LandlordEmail).first()
        house = House(someLandlord.Id, Address1, Address2, City, State, Zipcode, Rooms, ParkingSpots, MonthlyRent, UtilitiesIncluded, Laundry, Pets, Latitude, Longitude, DistFromCC)
        print house

        db.session.add(house)
        db.session.commit() 
        return jsonify([])
    else: 	
        return render_template('newhome.html')

###############################################################################
# For testing purposes

@app.route("/test", methods=['GET'])

def dbTest():
    print "here"
    # students = Student.query.first()
    # # return jsonify(students)
    # print students.FirstName
    # return jsonify(students.FirstName)
    houses = House.query.all()
    allHouses = [h.as_dict() for h in houses]
    jsonHouses = json.dumps(allHouses, default=defaultencode)
    # jsonHouses = json.dumps(allHouses)
    # allHouses = houses.as_d
    print jsonHouses
    return houses[0].City

@app.route("/test2", methods=['GET'])
def dbTest2():
    print "here"

    # Don't uncomment - Rachael was already added to database
    # frankie = Landlord('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())

    # print frankie.FirstName
    # db.session.add(frankie)
    # db.session.commit()
    ### Don't uncomment - No constraints yet on multiple houses
    # house = House(1, '23 Sunset Rd.', 'apt 2', 'somerville', 'MA', 02144, 3, 4, 3000, True, True, True, 42.408890, -71.124639, 0.25)
    # print house.City
    # db.session.add(house)
    # db.session.commit()
    return jsonify([])
###############################################################################

if __name__ == "__main__":
    app.run()
