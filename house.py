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

from app import mc

@house_page.route("/houses", methods=['GET'])
def houses():
    if 'username' in session:
        if mc.get("Houses") == True:
            print "GRABBING FROM CACHE"
            HouseIds = mc.get("AllIds")
            allHouses = []
            print HouseIds
            for hId in HouseIds:
                allHouses.append(mc.get(str(hId)))
            jsonHouses = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
        elif mc.get("Houses") == None:
            print "ABOUT TO CACHE"
            houses = House.query.all()
            allHouses = [h.as_dict() for h in houses]
            allIds = []
            for h in allHouses:
                #caching all the houses from the DB
                print h['Id']
                mc.set(str(h['Id']), h)
                allIds.append(h['Id'])
            mc.set("AllIds", allIds)
            mc.set("Houses", True)
            jsonHouses = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
        usertype = {"type": session['usertype']}
        return render_template('houses.html', rhouses=jsonHouses, usertype=usertype)
    else:
        return redirect(url_for('auth_page.index'))

@house_page.route("/house_profile=<arg1>", methods=['GET'])
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
        usertype = {"type": session['usertype']}
        reviews = Review.query.filter_by(HouseId=arg1).all();
        allReviews = [r.as_dict_JSON() for r in reviews]
        jsonReviews = json.dumps(allReviews, default=serializeDecimalObject.defaultencode)
        #should send back the contact for the landlord too??
        return render_template('house_profile.html', house=jsonHouse, landlord=jsonLandlord, usertype=usertype, reviews=jsonReviews)
    else:
        return redirect(url_for('auth_page.index'))

@house_page.route("/newhome", methods=['GET', 'POST'])
def newhome():
    #TOODshould there be a sessions check here?? Probably...
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
        house = House(someLandlord.Id, Address1, Address2, City, State, Zipcode, \
                      Rooms, ParkingSpots, MonthlyRent, UtilitiesIncluded, Laundry, \
                      Pets, Latitude, Longitude, DistFromCC, DateAvailable, LeaseTerm,\
                      datetime.now(), datetime.now(), True)
        print house
        db.session.add(house)
        #Handling SQLalchemy errors when a house cannot be inputted/already has the address
        #Will need to read just once unique key is handled 
        try:
            db.session.commit() 
            mc.delete("Houses") # flush cache, it's now stale
            mc.delete("AllIds") # flush cache, it's now stale
        except exc.IntegrityError:
            db.session.rollback()
            return jsonify([{'status':400, 'message':'This house has already been listed as active'}])
        return jsonify([{'status':201, "houseID":house.Id}])
    else:   
        if 'username' in session:
            usertype = {"type": session['usertype']}
            return render_template('newhome.html', usertype=usertype)
        else:
            return redirect(url_for('auth_page.index'))

@house_page.route("/house_profile_edit=<arg1>", methods=['GET', 'PUT'])
def editHouse(arg1):
    if 'username' in session:
        if request.method == 'GET':
            house = House.query.filter_by(Id=arg1).all()
            singleHouse = [h.as_dict() for h in house]
            sHouse = singleHouse[0]
            jsonHouse = json.dumps(singleHouse, default=serializeDecimalObject.defaultencode)
            landlordID = sHouse['LandlordId']
            landlord = Landlord.query.filter_by(Id=landlordID).all()
            singleLandlord = [l.as_dict_JSON() for l in landlord]
            jsonLandlord = json.dumps(singleLandlord, default=serializeDecimalObject.defaultencode)
            usertype = {"type": session['usertype']}
            return render_template('edit_house_profile.html', house=jsonHouse, landlord=jsonLandlord, usertype=usertype)
        elif request.method == 'PUT':
            HouseId = request.form['houseId']
            newRooms = int(request.form['bedrooms'])
            newParkingSpots = int(request.form['parking'])
            newMonthlyRent = int(request.form['rent'])
            newUtilitiesIncluded = True if request.form['utilities'] == 'true' else False
            newLaundry = True if request.form['laundry'] == 'true' else False
            newPets = True if request.form['pets'] == 'true' else False
            house = House.query.filter_by(Id=HouseId).first()
            #May want better logic about what to change -- does it make a difference?
            house.Rooms = newRooms
            house.ParkingSpots = newParkingSpots
            house.MonthlyRent = newMonthlyRent
            house.UtilitiesIncluded = newUtilitiesIncluded
            house.Laundry = newLaundry
            house.Pets = newPets
            try:
                db.session.commit()
                mc.delete("Houses") # flush cache, it's now stale
                mc.delete("AllIds") # flush cache, it's now stale
            except exc.IntegrityError:
                db.session.rollback()
                return jsonify([{'status':400, 'message':'Uh OH!!!!'}])
            return jsonify([{'status':200}])

    else:
        return redirect(url_for('auth_page.index'))
