# Comp120 Web Engineering
# 3/1/17
# Used sqlagencode to generate SQLAlcehmy classes from PostgreSQL tables
# https://pypi.python.org/pypi/sqlacodegen

# Password encrypt referenced:
# https://github.com/cburmeister/flask-bones/blob/master/app/user/models.py

# Database Models

# coding: utf-8
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from flask_store.sqla import FlaskStoreType
from flask_bcrypt import Bcrypt
import __builtin__

# create the database, to be imported later in app.py
# creating DB here avoids circular dependencies
db = SQLAlchemy()

bcrypt = Bcrypt()

class House(db.Model):
    __tablename__ = 'Houses'
    __table_args__ = (
        db.UniqueConstraint('Latitude', 'Longitude', 'Address1', 'Address2'),
        db.Index('ix_Houses_Latitude_Longitude_Address1_Address2', 'Latitude', 'Longitude', 'Address1', 'Address2'),
        {u'schema': 'OurHouse'}
    )

    Id = db.Column(db.Integer, primary_key=True)
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
    DateAvailable = db.Column(db.Date)
    LeaseTerm = db.Column(db.SmallInteger)
    CreatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp(), nullable=False)
    UpdatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.current_timestamp(), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)

    Landlord = db.relationship(u'Landlord', primaryjoin='House.LandlordId == Landlord.Id', backref=u'houses')

    def __init__(self, LandlordId, Address1, Address2, City, State, Zipcode, \
                 Rooms, ParkingSpots, MonthlyRent, UtilitiesIncluded, Laundry, \
                 Pets, Latitude, Longitude, DistFromCC, DateAvailable, LeaseTerm,\
                 CreatedAt, UpdatedAt, IsActive):
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
        self.DateAvailable = DateAvailable
        self.LeaseTerm = LeaseTerm 
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt
        self.IsActive = IsActive

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
            DistFromCC = self.DistFromCC,
            DateAvailable = str(self.DateAvailable), 
            LeaseTerm = self.LeaseTerm)

        return house

class Landlord(db.Model):
    __tablename__ = 'Landlords'
    __table_args__ = (

        db.Index('ix_Landlords_Email_PasswordHash', 'Email', 'PasswordHash'),
        {u'schema': 'OurHouse'}
    )

    Id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False, unique=True)
    PasswordHash = db.Column(db.String(60), nullable=False)
    Phone = db.Column(db.String(10), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)
    CreatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp(), nullable=False)
    UpdatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.current_timestamp(), nullable=False)
    
    def __init__(self, FirstName, LastName, Email, Password, Phone, IsActive, CreatedAt, UpdatedAt):
        self.FirstName = FirstName
        self.LastName = LastName
        self.Email = Email
        self.PasswordHash = bcrypt.generate_password_hash(Password, 10) # TODO: uncomment and change args in init ^^ and UI to sign up
        self.Phone = Phone
        self.IsActive = IsActive
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt

    def check_password(self, password):
        return bcrypt.check_password_hash(self.PasswordHash, password)

    def as_dict(self):
        landlord = __builtin__.dict(
            Id = self.Id, 
            FirstName =  self.FirstName,
            LastName = self.LastName,
            Email = self.Email,
            Phone = self.Phone,
            IsActive = self.IsActive,
            CreatedAt = self.CreatedAt,
            UpdatedAt = self.UpdatedAt)
        return landlord
    def as_dict_JSON(self):
        landlord = __builtin__.dict(
            Id = self.Id, 
            FirstName =  self.FirstName,
            LastName = self.LastName,
            Email = self.Email,
            Phone = self.Phone)
        return landlord


class Review(db.Model):
    __tablename__ = 'Reviews'
    __table_args__ = {u'schema': 'OurHouse'}

    Id = db.Column(db.Integer, primary_key=True)
    HouseId = db.Column(db.ForeignKey(u'OurHouse.Houses.Id'), nullable=False, index=True)
    StudentId = db.Column(db.ForeignKey(u'OurHouse.Students.Id'), nullable=False, index=True)
    Stars = db.Column(db.String(1), nullable=False)
    Comment = db.Column(db.String(4096))
    CreatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp(), nullable=False)
    UpdatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.current_timestamp(), nullable=False)

    House = db.relationship(u'House', primaryjoin='Review.HouseId == House.Id', backref=u'reviews')
    Student = db.relationship(u'Student', primaryjoin='Review.StudentId == Student.Id', backref=u'reviews')
    
    def __init__(self, HouseId, StudentId, Stars, Comment, CreatedAt, UpdatedAt):
        self.HouseId = HouseId
        self.StudentId = StudentId
        self.Stars = Stars
        self.Comment = Comment
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt
    def as_dict(self):
        review = __builtin__.dict(
            Id = self.Id, 
            HouseId =  self.HouseId,
            StudentId = self.StudentId,
            Stars = self.Stars,
            Comment = self.Comment,
            CreatedAt = self.CreatedAt,
            UpdatedAt = self.UpdatedAt
            )
        return review
    def as_dict_JSON(self):
        review = __builtin__.dict(
            Id = self.Id, 
            HouseId =  self.HouseId,
            StudentId = self.StudentId,
            Stars = self.Stars,
            Comment = self.Comment,
            CreatedAt = str(self.CreatedAt),
            UpdatedAt = str(self.UpdatedAt)
            )
        return review

class Student(db.Model):
    __tablename__ = 'Students'
    __table_args__ = (

        db.Index('ix_Students_Email_PasswordHash', 'Email', 'PasswordHash'),
        {u'schema': 'OurHouse'}
    )

    Id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False, unique=True)
    PasswordHash = db.Column(db.String(60), nullable=False)
    Phone = db.Column(db.String(10), nullable=False)
    IsActive = db.Column(db.Boolean, nullable=False)
    CreatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp(), nullable=False)
    UpdatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.current_timestamp(), nullable=False)

    def __init__(self, FirstName, LastName, Email, Password, Phone, IsActive, CreatedAt, UpdatedAt):
        self.FirstName = FirstName
        self.LastName = LastName
        self.Email = Email
        self.PasswordHash = bcrypt.generate_password_hash(Password, 10) # TODO: uncomment and change args in init ^^ and UI to sign up
        self.Phone = Phone
        self.IsActive = IsActive
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt

    def check_password(self, password):
        return bcrypt.check_password_hash(self.PasswordHash, password)

    def as_dict(self):
        student = __builtin__.dict(
            Id = self.Id, 
            FirstName =  self.FirstName,
            LastName = self.LastName,
            Email = self.Email,
            Phone = self.Phone,
            IsActive = self.IsActive,
            CreatedAt = self.CreatedAt,
            UpdatedAt = self.UpdatedAt)
        return student
    def as_dict_JSON(self):
        student = __builtin__.dict(
            Id = self.Id, 
            FirstName =  self.FirstName,
            LastName = self.LastName,
            Email = self.Email,
            Phone = self.Phone)
        return student

class Photo(db.Model):
    __tablename__ = 'Photos'
    __table_args__ = (
        db.Index('ix_Photos_RelativePath', 'RelativePath'),
        {u'schema': 'OurHouse'}
    )

    Id = db.Column(db.Integer, primary_key=True)
    HouseId = db.Column(db.ForeignKey(u'OurHouse.Houses.Id'), nullable=False, index=True)
    RelativePath = db.Column(FlaskStoreType(), unique=True, nullable=False)
    CreatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp(), nullable=False)
    UpdatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.current_timestamp(), nullable=False)

    House = db.relationship(u'House', primaryjoin='Photo.HouseId == House.Id', backref=u'photos')

    def __init__(self, HouseId, RelativePath, CreatedAt, UpdatedAt):
        self.HouseId = HouseId
        self.RelativePath = RelativePath
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt
    def as_dict(self):
        photo = __builtin__.dict(
            Id = self.Id, 
            HouseId =  self.HouseId,
            RelativePath = self.RelativePath,
            CreatedAt = self.CreatedAt,
            UpdatedAt = self.UpdatedAt)
        return photo
    def as_dict_JSON(self):
        photo = __builtin__.dict(
            Id = self.Id, 
            HouseId =  self.HouseId,
            RelativePath = str(self.RelativePath))
        return photo

class Developer(db.Model):
    __tablename__ = 'Developers'
    __table_args__ = (
        db.Index('ix_Developers_Key', 'Key'),
        {u'schema': 'OurHouse'}
    )

    Id = db.Column(db.Integer, primary_key=True)
    ProjectName = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(62), nullable=False)
    Key = db.Column(db.String(128), nullable=False, unique=True)
    CreatedAt = db.Column(db.DateTime(True), nullable=False)
    UpdatedAt = db.Column(db.DateTime(True), nullable=False)
    CreatedAt = db.Column(db.DateTime(timezone=True), server_default=db.func.current_timestamp(), nullable=False)
    UpdatedAt = db.Column(db.DateTime(timezone=True), onupdate=db.func.current_timestamp(), nullable=False)

    def __init__(self, ProjectName, Email, Key, CreatedAt, UpdatedAt):
        self.ProjectName = ProjectName
        self.Email = Email
        self.Key = Key
        self.CreatedAt = CreatedAt
        self.UpdatedAt = UpdatedAt
    def as_dict(self):
        dev = __builtin__.dict(
            Id = self.Id, 
            ProjectName =  self.ProjectName,
            Email = self.Email,
            Key = self.Key,
            CreatedAt = self.CreatedAt,
            UpdatedAt = self.UpdatedAt)
        return dev
    def as_dict_JSON(self):
        dev = __builtin__.dict(
            Id = self.Id, 
            ProjectName =  self.ProjectName,
            Email = self.Email,
            Key = self.Key)
        return dev
