## review.py
## contains routes pertaining to reviews

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

@review_page.route("/reviews", methods=['POST'])
def reviews():
    if 'username' in session and request.method == 'POST':
        Comment = request.form['Comment']
        Stars = request.form["Stars"]
        HouseId = request.form["House"]
        StudentEmail = session["username"]
        student = Student.query.filter_by(Email=StudentEmail).first()
        house = House.query.filter_by(Id=HouseId).first()
        if student == None:
            return jsonify({"status": 404, "message":"User is not a student so unauthorized to write revew."})
        else:
            review = Review(house.Id, student.Id, Stars, Comment, datetime.now(), datetime.now())
            db.session.add(review)
            try:
                db.session.commit() 
            except exc.IntegrityError:
                db.session.rollback()
                return jsonify([{'status':400, 'message':"Opps you can't post that!"}])
            return jsonify({"status": 200})
    else :
        return jsonify({"status": 404})
        