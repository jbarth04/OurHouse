# Comp120 Web Engineering
# 3/1/17
# Used sqlagencode to generate SQLAlcehmy classes from PostgreSQL tables
# https://pypi.python.org/pypi/sqlacodegen

# Database Models

# coding: utf-8
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, Numeric, String
from sqlalchemy.schema import FetchedValue
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
import __builtin__

# create the database, to be imported later in app.py
# creating DB here avoids circular dependencies
db = SQLAlchemy()

class House(db.Model):
    __tablename__ = 'Houses'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    LandlordId = db.Column(db.ForeignKey(u'OurHouse.Landlords.Id'), nullable=False, index=True)
    Address1 = db.Column(db.String(120), nullable=False)
    Address2 = db.Column(db.String(120))
    City = db.Column(db.String(100), nullable=False)
    State = db.Column(db.String(2), nullable=False)
    Zipcode = db.Column(db.String(5), nullable=False)
    Rooms = db.Column(db.Integer, nullable=False)
    ParkingSpots = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    MonthlyRent = db.Column(db.Integer, nullable=False)
    UtilitiesIncluded = db.Column(db.Boolean, nullable=False)
    Laundry = db.Column(db.Boolean, nullable=False)
    Pets = db.Column(db.Boolean, nullable=False)
    Latitude = db.Column(db.Numeric, nullable=False)
    Longitude = db.Column(db.Numeric, nullable=False)
    DistFromCC = db.Column(db.Float, nullable=False)

    Landlord = db.relationship(u'Landlord', primaryjoin='House.LandlordId == Landlord.Id', backref=u'houses')

    def __init__(self, LandlordId, Address1, Address2, City, State, Zipcode, Rooms, ParkingSpots, MonthlyRent, UtilitiesIncluded, Laundry, Pets, Latitude, Longitude, DistFromCC):
        self.LandlordId = LandlordId
        self.Address1 = Address1
        self.Address2 = Address2
        self.City = City
        self.State = State
        self.Zipcode = Zipcode
        self.Rooms = Rooms
        self.ParkingSpots = ParkingSpots
        self.MonthlyRent = MonthlyRent
        self.UtilitiesIncluded = UtilitiesIncluded
        self.Laundry = Laundry
        self.Pets = Pets
        self.Latitude = Latitude
        self.Longitude = Longitude
        self.DistFromCC = DistFromCC

    def as_dict(self):
        house = __builtin__.dict(
            Id=self.Id, 
            LandlordId =  self.LandlordId,
            Address1 = self.Address1,
            Address2 = self.Address2,
            City = self.City,
            State = self.State,
            Zipcode = self.Zipcode,
            Rooms = self.Rooms,
            ParkingSpots = self.ParkingSpots,
            MonthlyRent = self.MonthlyRent,
            UtilitiesIncluded = self.UtilitiesIncluded,
            Laundry = self.Laundry,
            Pets = self.Pets,
            Latitude = self.Latitude,
            Longitude = self.Longitude,
            DistFromCC = self.DistFromCC)
        return house

class Landlord(db.Model):
    __tablename__ = 'Landlords'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False)
    Phone = db.Column(db.String(10), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)
    CreatedAt = db.Column(db.DateTime(True), nullable=False)
    UpdatedAt = db.Column(db.DateTime(True), nullable=False)
    
    def __init__(self, FirstName, LastName, Email, Phone, IsActive, CreatedAt, UpdatedAt):
        self.FirstName = FirstName
        self.LastName = LastName
        self.Email = Email
        self.Phone = Phone
        self.IsActive = IsActive
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt


class Review(db.Model):
    __tablename__ = 'Reviews'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    HouseId = db.Column(db.ForeignKey(u'OurHouse.Houses.Id'), nullable=False, index=True)
    StudentId = db.Column(db.ForeignKey(u'OurHouse.Students.Id'), nullable=False, index=True)
    Stars = db.Column(db.String, nullable=False)
    Comment = db.Column(db.String(2048))
    House = db.relationship(u'House', primaryjoin='Review.HouseId == House.Id', backref=u'reviews')
    Student = db.relationship(u'Student', primaryjoin='Review.StudentId == Student.Id', backref=u'reviews')


class Student(db.Model):
    __tablename__ = 'Students'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False, unique=True)
    Phone = db.Column(db.String(10), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)
    CreatedAt = db.Column(db.DateTime(True), nullable=False)
    UpdatedAt = db.Column(db.DateTime(True), nullable=False)

    def __init__(self, FirstName, LastName, Email, Phone, IsActive, CreatedAt, UpdatedAt):
        self.FirstName = FirstName
        self.LastName = LastName
        self.Email = Email
        self.Phone = Phone
        self.IsActive = IsActive
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt