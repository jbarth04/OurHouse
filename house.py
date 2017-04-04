## house.py
## contains routes pertaining to houses: homepage, uploading new house listing, 
## house profile 

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

house_page = Blueprint('house_page', __name__)

import json

import serializeDecimalObject

@house_page.route("/houses", methods=['GET'])
def houses():
    if 'username' in session:
        houses = House.query.all()
        allHouses = [h.as_dict() for h in houses]
        jsonHouses = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
        return render_template('houses.html', rhouses=jsonHouses)
    else:
        return redirect(url_for('auth_page.index'))

@house_page.route("/house_profile/<arg1>", methods=['GET'])
def viewhouse(arg1):
    if 'username' in session:
        ### Will want to cache the houses so this won't be a query every time
        ## Or figure out a better way to avoid a read from the database
        house = House.query.filter_by(Id=arg1).all()
        singleHouse = [h.as_dict() for h in house]
        sHouse = singleHouse[0]
        jsonHouse = json.dumps(singleHouse, default=serializeDecimalObject.defaultencode)
        #Getting the landlord associated with 
        landlordID = sHouse['LandlordId']
        landlord = Landlord.query.filter_by(Id=landlordID).all()
        singleLandlord = [l.as_dict_JSON() for l in landlord]
        jsonLandlord = json.dumps(singleLandlord, default=serializeDecimalObject.defaultencode)
        #should send back the contact for the landlord too??
        return render_template('house_profile.html', house=jsonHouse, landlord=jsonLandlord)
    else:
        return redirect(url_for('auth_page.index'))

@house_page.route("/newhome", methods=['GET', 'POST'])
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
        Zipcode = request.form['zip']   # parseFloat deprecated 
        Rooms = int(request.form['bedrooms'])
        ParkingSpots = int(request.form['parking'])
        MonthlyRent = int(request.form['rent'])
        UtilitiesIncluded = True if request.form['utilities'] == 'true' else False
        Laundry = True if request.form['laundry'] == 'true' else False
        Pets = True if request.form['pets'] == 'true' else False
        Latitude = request.form['latitude']
        Longitude = request.form['longitude']
        DistFromCC = request.form['disttocc']
        DayAvailable = int(request.form['availableday'])
        MonthAvailable = int(request.form['availablemonth'])
        YearAvailable = int(request.form['availableyear'])
        DateAvailable = datetime(YearAvailable, MonthAvailable, DayAvailable, 0, 0)
        LeaseTerm = int(request.form['leaseterm'])
        #Finding corresponding landlord based on email
        someLandlord = Landlord.query.filter_by(Email=LandlordEmail).first()
        #If no landlord exists by that email
        if someLandlord == None:
            return jsonify([{'status':400, 'message':'Landlord does not match any on file, please check the email.'}]) 
        house = House(someLandlord.Id, Address1, Address2, City, State, Zipcode, Rooms, ParkingSpots, MonthlyRent, UtilitiesIncluded, Laundry, Pets, Latitude, Longitude, DistFromCC, DateAvailable, LeaseTerm)
        print house
        db.session.add(house)
        #Handling SQLalchemy errors when a house cannot be inputted/already has the address
        #Will need to readjust once unique key is handled 
        try:
            db.session.commit() 
        except exc.IntegrityError:
            return jsonify([{'status':400, 'message':'This house has already been listed as active'}])
        return jsonify([{'status':200}])
    else:   
        if 'username' in session:
            return render_template('newhome.html')
        else:
            return redirect(url_for('auth_page.index'))
