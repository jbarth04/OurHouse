from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal
from sqlalchemy import exc

from flask import Blueprint

import os

tests_page = Blueprint('tests_page', __name__)

@tests_page.route("/test", methods=['GET'])
def dbTest():
    print "here"
    # students = Student.query.first()
    # # return jsonify(students)
    # print students.FirstName
    # return jsonify(students.FirstName)
    houses = House.query.all()
    allHouses = [h.as_dict() for h in houses]
    jsonHouses = json.dumps(allHouses, default=defaultencode)
    # jsonHouses = json.dumps(allHouses)
    # allHouses = houses.as_d
    print jsonHouses
    return houses[0].City

@tests_page.route("/test2", methods=['GET'])
def dbTest2():
    print "here"

    # Don't uncomment - Rachael was already added to database
    # frankie = Landlord('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())

    # print frankie.FirstName
    # db.session.add(frankie)
    # db.session.commit()
    ### Don't uncomment - No constraints yet on multiple houses
    # house = House(1, '23 Sunset Rd.', 'apt 2', 'somerville', 'MA', 02144, 3, 4, 3000, True, True, True, 42.408890, -71.124639, 0.25)
    # print house.City
    # db.session.add(house)
    # db.session.commit()
    return jsonify([])

@tests_page.route("/test3", methods=['GET'])
def WTF():
    return jsonify([{'status':200}])