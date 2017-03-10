from flask import Flask, render_template, jsonify, request, redirect, url_for 
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal
from sqlalchemy import exc

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
        Email = request.form['email']
        #Will use firebase for authentication so not checking passwords here
        someStudent = Student.query.filter_by(Email=Email).first()
        someLandlord = Landlord.query.filter_by(Email=Email).first()
        if (someStudent == None and someLandlord == None) or Email == '':
            return jsonify([{'status':400, 'message':'Username/email does not exist. Please try again.'}])
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
            return jsonify([{'status':400, 'message':'A user with this email already exists.'}])
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
        #Finding corresponding landlord based on email
        someLandlord = Landlord.query.filter_by(Email=LandlordEmail).first()
        house = House(someLandlord.Id, Address1, Address2, City, State, Zipcode, Rooms, ParkingSpots, MonthlyRent, UtilitiesIncluded, Laundry, Pets, Latitude, Longitude, DistFromCC)
        db.session.add(house)
        #Handling SQLalchemy errors when a house cannot be inputted/already has the address
        #Will need to readjust once unique key is handled 
        try:
            db.session.commit() 
        except exc.IntegrityError:
            return jsonify([{'status':400, 'message':'This house has already been listed as active'}])
        return jsonify([{'status':200}])
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
