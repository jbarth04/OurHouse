## developer.py
## contains routes pertaining to devlopers: API docomentation page 

from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal
from sqlalchemy import exc

import os

import hashlib
import base64 
import random

# import created database in models.py and import the tables
from models import db
from models import Student
from models import Landlord
from models import House
from models import Review
from models import Developer

from flask import Blueprint

developer_page = Blueprint('developer_page', __name__)

import json

import serializeDecimalObject

@developer_page.route("/developer", methods=['GET'])
def dev_home():
	return render_template('developer.html')

@developer_page.route("/houseData/<APIKey>/<FilterBy>=<FilterValue>/<NumResponses>", methods=['GET'])
def get_houses(APIKey, FilterBy, FilterValue, NumResponses):
	if request.method == 'GET':
		developer = Developer.query.filter_by(Key=APIKey).first()
		if developer == None:
			return jsonify([{'status':400, 'message':"This is either not a valid API key or we just don't like you"}])
		kwargs = {FilterBy:FilterValue}
		houses = House.query.filter_by(**kwargs).limit(NumResponses).all()
		#return that info in a JSON Object 
		allHouses = [h.as_dict() for h in houses]
		jsonHouses = json.dumps(allHouses, default=serializeDecimalObject.defaultencode)
		return jsonHouses
@developer_page.route("/reviewData/<APIKey>/HouseID=<HouseId>/<NumResponses>", methods=['GET'])
def get_review(APIKey, HouseId, NumResponses):
	if request.method ==  'GET':
		print "HERE"
		developer = Developer.query.filter_by(Key=APIKey).first()
		if developer == None:
			return jsonify([{'status':400, 'message':"This is either not a valid API key or we just don't like you"}])
		# kwargs = {FilterBy:FilterValue}
		reviews = Review.query.filter_by(HouseId=HouseId).limit(NumResponses).all()
		#return that info in a JSON Object 
		allReviews = [r.as_dict_JSON() for r in reviews]
		jsonReviews = json.dumps(allReviews, default=serializeDecimalObject.defaultencode)
		return jsonReviews

@developer_page.route("/statistics/<APIKey>/<Type1>/<FilterBy>=<FilterValue>", methods=['GET'])
def get_landlord(APIKey, Type1, FilterBy, FilterValue):
	if request.method ==  'GET':
		developer = Developer.query.filter_by(Key=APIKey).first()
		if developer == None:
			return jsonify([{'status':400, 'message':"This is either not a valid API key or we just don't like you"}])
		kwargs = {FilterBy:FilterValue}
		if Type1 == "Landlord":
			houses = House.query.filter_by(**kwargs).all()
			landlordIds = [h.LandlordId for h in houses]
			numLandlords = len(set(landlordIds))
			return jsonify([{"numberLandlords":numLandlords}])
		if Type1 == "House":
			houses = House.query.filter_by(**kwargs).all()
			numHouses = len(houses)
			return jsonify([{"numberHouses":numHouses}])
		
@developer_page.route("/generateAPIkey", methods=['POST'])
def generate_key():
	if request.method == 'POST':
		projectName = request.form['ProjectName']
		email = request.form['Email']
		key = generate_hash_key()
		developer = Developer(projectName, email, key, datetime.now(), datetime.now())
		db.session.add(developer)
		try:
			db.session.commit()
		except exc.IntegrityError:
			db.session.rollback()
			return jsonify([{'status':400, 'message':'Error: Unable to generate key for you at this time'}])
		return jsonify([{'status':201, 'key':key}])

def generate_hash_key():
    """
    @return: A hashkey for use to authenticate agains the API. 
    from https://github.com/haukurk/flask-restapi-recipe
    """
    return base64.b64encode(hashlib.sha256(str(random.getrandbits(256))).digest(),
                            random.choice(['rA', 'aZ', 'gQ', 'hH', 'hG', 'aR', 'DD'])).rstrip('==')