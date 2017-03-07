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


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/houses")
def houses():
	return render_template('houses.html')

@app.route("/newhome")
def newhome():
	return render_template('newhome.html')

@app.route("/test", methods=['GET'])
def dbTest():
    print "here"
    students = Student.query.first()
    # return jsonify(students)
    print students.FirstName
    return jsonify(students.FirstName)

@app.route("/test2", methods=['GET'])
def dbTest2():
    print "here"

    # Don't uncomment - Rachael was already added to database
    # rach = Student('Rachael', 'Robinson', 'rachael.robinson95@gamil.com', 1112223333, True, datetime.now(), datetime.now())
    # print rach.FirstName
    # db.session.add(rach)
    # db.session.commit()

    return jsonify([])

if __name__ == "__main__":
    app.run()
