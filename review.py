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

review_page = Blueprint('review_page', __name__)

import json

import serializeDecimalObject

from app import mc

@review_page.route("/reviews", methods=['POST'])
def reviews():
    if 'username' in session and request.method == 'POST':
        print "GOT A POST"
        #get student's id from the sessions
        Comment = request.form['Comment']
        Stars = request.form["Stars"]
        HouseId = request.form["HouseId"]
        StudentEmail = session["username"]
        return jsonify({"status": 200})
    else :
        return jsonify({"status": 404})
        