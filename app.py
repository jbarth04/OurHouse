from flask import Flask, render_template, jsonify
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

# db.create_all()

###################### Routes #############################
import json
#####################Decimal JSON encoding ################
# http://stackoverflow.com/questions/1960516/python-json-serialize-a-decimal-
# object
# User: tesdal
###########################################################
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

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/houses", methods=['GET'])
def houses():
    houses = House.query.all()
    allHouses = [h.as_dict() for h in houses]
    jsonHouses = json.dumps(allHouses, default=defaultencode)
    return render_template('houses.html', rhouses=jsonHouses)
    # return render_template('houses.html')

@app.route("/signup", methods=['GET'])
def signup():
    # houses = House.query.all()
    # allHouses = [h.as_dict() for h in houses]
    # jsonHouses = json.dumps(allHouses, default=defaultencode)
    return render_template('signup.html')
    # return render_template('houses.html')

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
    # frankie = Student('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
    # print frankie.FirstName
    # db.session.add(frankie)
    # db.session.commit()
    # house = House(1, '33 capen', 'apt 2', 'somerville', 'MA', 02155, 3, 4, 3000, True, True, True, 42.411291, -71.124046, 0.3)
    # print house.City
    # db.session.add(house)
    # db.session.commit()
    return jsonify([])

if __name__ == "__main__":
    app.run()
