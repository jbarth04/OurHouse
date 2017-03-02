from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
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

################### Database Models ######################

# Database Models

# coding: utf-8
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, Numeric, String
from sqlalchemy.schema import FetchedValue
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

# create the database, to be imported later in app.py
# creating DB here avoids circular dependencies
db = SQLAlchemy(app)

class House(db.Model):
    __tablename__ = 'Houses'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    LandlordId = db.Column(db.ForeignKey(u'OurHouse.Landlords.Id'), nullable=False, index=True)
    Address1 = db.Column(db.String(120), nullable=False)
    Address2 = db.Column(db.String(120))
    City = db.Column(db.String(100), nullable=False)
    State = db.Column(db.String(2), nullable=False)
    Zipcode = db.Column(db.String(5), nullable=False)
    Rooms = db.Column(db.Integer, nullable=False)
    ParkingSpots = db.Column(db.Integer, nullable=False)
    MonthlyRent = db.Column(db.Integer, nullable=False)
    UtilitiesIncluded = db.Column(db.Boolean, nullable=False)
    Laundry = db.Column(db.Boolean, nullable=False)
    Pets = db.Column(db.Boolean, nullable=False)
    Latitude = db.Column(db.Numeric, nullable=False)
    Longitude = db.Column(db.Numeric, nullable=False)
    DistFromCC = db.Column(db.Float, nullable=False)

    Landlord = db.relationship(u'Landlord', primaryjoin='House.LandlordId == Landlord.Id', backref=u'houses')


class Landlord(db.Model):
    __tablename__ = 'Landlords'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False)
    Phone = db.Column(db.String(10), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)
    CreatedAt = db.Column(db.DateTime(True), nullable=False)
    UpdatedAt = db.Column(db.DateTime(True), nullable=False)


class Review(db.Model):
    __tablename__ = 'Reviews'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    HouseId = db.Column(db.ForeignKey(u'OurHouse.Houses.Id'), nullable=False, index=True)
    StudentId = db.Column(db.ForeignKey(u'OurHouse.Students.Id'), nullable=False, index=True)
    Stars = db.Column(db.String, nullable=False)
    Comment = db.Column(db.String(2048))

    House = db.relationship(u'House', primaryjoin='Review.HouseId == House.Id', backref=u'reviews')
    Student = db.relationship(u'Student', primaryjoin='Review.StudentId == Student.Id', backref=u'reviews')


class Student(db.Model):
    __tablename__ = 'Students'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False)
    Phone = db.Column(db.String(10), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)
    CreatedAt = db.Column(db.DateTime(True), nullable=False)
    UpdatedAt = db.Column(db.DateTime(True), nullable=False)

############ Do the configuration for the database #############

# # get database info from secret config.py file, NOT pushed to github or heroku
# app.config.from_object(os.environ['APP_SETTINGS'])
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # make sure we got the database URL
# if app.config['SQLALCHEMY_DATABASE_URI'] == None:
#     print "Need database config"
#     sys.exit(1)

# # import created database in models.py
# from models import db
# db.init_app(app)

# # import tables
# from models import Student
# from models import Landlord
# from models import House
# from models import Review

db.create_all()

###################### Routes #############################


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/houses")
def houses():
	return render_template('houses.html')

@app.route("/test", methods=['GET'])
def dbTest():
    print "here"
    students = Student.query.first()
    print students.FirstName
    return jsonify(students.FirstName)

if __name__ == "__main__":
    app.run()
