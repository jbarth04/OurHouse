## house.py
## contains routes pertaining to houses: homepage, uploading new house listing, 
## house profile 

from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal
from sqlalchemy import exc

import os

import config

# These are used to get Zillow info and parse the XML that is returned
import requests
import xmltodict


# import created database in models.py and import the tables
from models import db
from models import Student
from models import Landlord
from models import House
from models import Review
from models import Photo

from flask import Blueprint

house_page = Blueprint('house_page', __name__)

import json

import serializeDecimalObject

from memcache import mc

@house_page.route("/houses", methods=['GET'])
def houses():
    if 'username' in session:
        if mc.get("Houses") == True:
            print "GRABBING FROM CACHE"
            HouseIds = mc.get("AllIds")
            allHouses = []
            photos = []
            for hId in HouseIds:
                allHouses.append(mc.get(str(hId)))
                photo = Photo.query.filter_by(HouseId=hId).first()
                if photo == None: 
                    photos.append({"HouseId":hId, "PhotoUrl":""})
                else:
                    photoDict = photo.as_dict()
                    photoUrl = (photoDict['RelativePath']).absolute_url
                    photos.append({"HouseId":hId, "PhotoUrl":str(photoUrl)})
            jsonHouses = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
        elif mc.get("Houses") == None:
            print "ABOUT TO CACHE"
            houses = House.query.all()
            allHouses = [h.as_dict() for h in houses]
            allIds = []
            photos = []
            for h in allHouses:
                #caching all the houses from the DB
                mc.set(str(h['Id']), h)
                allIds.append(h['Id'])
                photo = Photo.query.filter_by(HouseId=h["Id"]).first()
                if photo == None:
                    photos.append({"HouseId":h["Id"], "PhotoUrl":""})
                else:
                    photoDict = photo.as_dict()
                    photoUrl = (photoDict['RelativePath']).absolute_url
                    photos.append({"HouseId":h["Id"], "PhotoUrl":str(photoUrl)})
            mc.set("AllIds", allIds)
            mc.set("Houses", True)
            jsonHouses = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
        usertype = {"type": session['usertype']}
        jsonPhotos = json.dumps(photos)
        return render_template('houses.html', rhouses=jsonHouses, usertype=usertype, photos=jsonPhotos)
    else:
        return redirect(url_for('auth_page.index'))

@house_page.route("/house_profile=<houseID>", methods=['GET'])
def viewhouse(houseID):
    if 'username' in session:
        # Step 1: get house by house ID and it's landlord and make into json
        house = House.query.filter_by(Id=houseID).all()
        singleHouse = [h.as_dict() for h in house]
        sHouse = singleHouse[0]
        jsonHouse = json.dumps(singleHouse, default=serializeDecimalObject.defaultencode)
        print "Here in house_profile"
        print jsonHouse

        # Getting the landlord associated with 
        landlordID = sHouse['LandlordId']
        landlord = Landlord.query.filter_by(Id=landlordID).all()
        singleLandlord = [l.as_dict_JSON() for l in landlord]
        jsonLandlord = json.dumps(singleLandlord, default=serializeDecimalObject.defaultencode)
        usertype = {"type": session['usertype']}
        reviews = Review.query.filter_by(HouseId=houseID).all();
        allReviews = [r.as_dict_JSON() for r in reviews]
        jsonReviews = json.dumps(allReviews, default=serializeDecimalObject.defaultencode)

        # Step 2: get photos associated with that house
        photos = Photo.query.filter_by(HouseId=houseID).all()

        if photos == None:
            return jsonify([{'status':200, 'AbsoluteURLs': []}])
    
        # Return an array of absolute URL of photos
        allPhotos = [p.as_dict() for p in photos]
        allPhotoURLS = []
        for p in allPhotos:
            allPhotoURLS.append((p['RelativePath']).absolute_url)
        allPhotos = []
        for p in allPhotoURLS:
            allPhotos.append(str(p))
        jsonAllPhotos = json.dumps(allPhotos)

        # Step 3: get zillow data:
        ZillowData = getZillow(sHouse["Address1"], sHouse["Zipcode"])
        
        return render_template('house_profile.html', house=jsonHouse, landlord=jsonLandlord,\
                                usertype=usertype, reviews=jsonReviews, photos=jsonAllPhotos, zillowData=ZillowData)
    else:
        return redirect(url_for('auth_page.index'))

def getZillow(address, zipcode):
    # TODO: make creating ZData modular (make it's own function)
    # Step 3: get zillow information associated with the house address

    # The information we'll try to grab about the properties 
    keys = ["homeDescription", "parkingType", "finishedSqFt", "numFloors", "rooms", "appliances",\
                    "heatingSystem", "heatingSource", "yearBuilt", "yearUpated"]
    # Get zillow API Key from environment
    _config_setting = os.environ["ZWSID"]
    _config_arr = _config_setting.split(".")
    # Trying to get just the key part (e.g. DevelopmentConfig)
    zwsid =  _config_arr[-1]

    # formatting for zillow API
    zAddress = address.replace(" ", "+")
    zipCode = zipcode
    zillowUrl = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id='\
                + zwsid + '&address=' + zAddress + '&citystatezip=' + zipCode;
    
    result = requests.get(zillowUrl).content
    xmlDict = xmltodict.parse(result)
    ZillowSearchResult = xmlDict["SearchResults:searchresults"]
    # If there is a response for this address:
    if "response" in ZillowSearchResult:
        print "HERE YEAH"
        # Try block here for error that occured when searching incorrect addresses
        # When 20 Sunset Road. 02155 was searched, error called that list must be indexed by 
            # integers not strings. This prevents that error. 
        try:
            zillowID = ZillowSearchResult["response"]["results"]["result"]["zpid"]
        except:
            ZData = {}
            for k in keys:
                ZData[k] = ""
            ZillowData = json.dumps({"ZillowData": ZData})

            print "Here in getZillow"
            return ZillowData

            # TODO don't render template here
            # return render_template('house_profile.html', house=jsonHouse, landlord=jsonLandlord,\
            #                 usertype=usertype, reviews=jsonReviews, photos=jsonAllPhotos, zillowData=ZillowData)
        updatedUrl = "http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=" \
                     + zwsid + "&zpid=" + zillowID
        
        # Get Updated Results from Zillow (the data that we really want)
        updatedResult = requests.get(updatedUrl).content 
        # print updatedResult
        updatedResultDict = xmltodict.parse(updatedResult)["UpdatedPropertyDetails:updatedPropertyDetails"]
        # If there is updated data for the house
        if "response" in updatedResultDict:
            response = updatedResultDict["response"]
            ZData = {}
            for k in keys:
                if k in response:
                    ZData[k] = response[k]
                else: 
                    ZData[k] = ""
            ZillowData = json.dumps({"ZillowData": ZData})
        # If no updated info for the house
        else:
            ZData = {}
            for k in keys:
                ZData[k] = ""
            ZillowData = json.dumps({"ZillowData": ZData})
    # if no info about the house at all on
    else:
        ZData = {}
        for k in keys:
            ZData[k] = ""
        ZillowData = json.dumps({"ZillowData": ZData})
    return ZillowData

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
            newLeaseTerm = int(request.form['leaseterm'])
            newDayAvailable = int(request.form['availableday'])
            newMonthAvailable = int(request.form['availablemonth'])
            newYearAvailable = int(request.form['availableyear'])  
            newDateAvailable = datetime(newYearAvailable, newMonthAvailable, newDayAvailable, 0, 0)
            house = House.query.filter_by(Id=HouseId).first()
            #May want better logic about what to change -- does it make a difference?
            house.Rooms = newRooms
            house.ParkingSpots = newParkingSpots
            house.MonthlyRent = newMonthlyRent
            house.UtilitiesIncluded = newUtilitiesIncluded
            house.Laundry = newLaundry
            house.Pets = newPets
            house.LeaseTerm = newLeaseTerm
            house.DateAvailable = newDateAvailable
            try:
                db.session.commit()
                mc.delete("Houses") # flush cache, it's now stale
                mc.delete("AllIds") # flush cache, it's now stale
            except exc.IntegrityError:
                db.session.rollback()
                return jsonify([{'status':400, 'message':'Uh OH!!!!'}])
            return jsonify([{'status':200, "houseId":house.Id}])

    else:
        return redirect(url_for('auth_page.index'))
