from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
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

# db.create_all()

###################### Routes #############################
import json
# houses = [
#     {
#         "Id": 1,
#         "LandlordId": 3,
#         "Address1": "54 sunset Rd",
#         "Address2": "Apt 2",
#         "City":"Somerville",
#         "State": "MA",
#         "Zipcode": "02144",
#         "Rooms": 4,
#         "ParkingSpots": 1,
#         "MonthlyRent": 3200,
#         "UtilitiesIncluded": True,
#         "Laundry": False,
#         "Pets": True,
#         "Lat": 42.409044,
#         "Lng": -71.126143,
#         "Dist": 0.13
#     },
#     {
#         "Id": 2,
#         "LandlordId": 4,
#         "Address1": "99 Yale St",
#         "Address2": "Apt 2",
#         "City":"Medford",
#         "State": "MA",
#         "Zipcode": "02155",
#         "Rooms": 4,
#         "ParkingSpots": 2,
#         "MonthlyRent": 2800,
#         "UtilitiesIncluded": True,
#         "Laundry": True,
#         "Pets": True,
#         "Lat": 42.404477,
#         "Lng": -71.112067,
#         "Dist": 0.23
#     },
#     {
#         "Id": 3,
#         "LandlordId": 3,
#         "Address1": "3 Capen St.",
#         "Address2": "Apt 2",
#         "City":"Medford",
#         "State": "MA",
#         "Zipcode": "02155",
#         "Rooms": 3,
#         "ParkingSpots": 1,
#         "MonthlyRent": 3400,
#         "UtilitiesIncluded": True,
#         "Laundry": True,
#         "Pets": False,
#         "Lat": 42.410660,
#         "Lng": -71.122557,
#         "Dist": 0.12
#     },
#     {
#         "Id": 4,
#         "LandlordId": 2,
#         "Address1": "18 Curtis Ave.",
#         "Address2": "Apt 1",
#         "City":"Medford",
#         "State": "MA",
#         "Zipcode": "02155",
#         "Rooms": 4,
#         "ParkingSpots": 2,
#         "MonthlyRent": 3600,
#         "UtilitiesIncluded": True,
#         "Laundry": False,
#         "Pets": False,
#         "Lat": 42.407568,
#         "Lng": -71.125496,
#         "Dist": 0.16
#     }
# ];
# # jsonHouses = []
# # for house in houses:
# #     jsonHouses.append(json.dumps(house))
# jsonHouses = json.dumps(houses)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/houses", methods=['GET'])
def houses():
    # print jsonHouses
    # return render_template('houses.html', rhouses=jsonHouses)
    return render_template('houses.html')

@app.route("/test", methods=['GET'])
def dbTest():
    print "here"
    # students = Student.query.first()
    # # return jsonify(students)
    # print students.FirstName
    # return jsonify(students.FirstName)
    landlord = Landlord.query.first()
    print landlord.FirstName
    return jsonify(landlord.FirstName)

@app.route("/test2", methods=['GET'])
def dbTest2():
    print "here"
    # Don't uncomment - Rachael was already added to database
    # frankie = Student('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
    # print frankie.FirstName
    # db.session.add(frankie)
    # db.session.commit()
    bob = Landlord('Bob', 'Smith', 'bob.smith@gmail.com', 2223334444, True, datetime.now(), datetime.now())
    print bob.FirstName
    db.session.add(bob)
    db.session.commit()

    return jsonify([])

if __name__ == "__main__":
    app.run()
