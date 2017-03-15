 # $ export APP_SETTINGS="config.DevelopmentConfig"
 # $ export DATABASE_URL="postgresql://Rachael@localhost/OurHouse_UnitTest"

# Helpful links
# http://stackoverflow.com/questions/15068988/flask-sqlalchemy-not-creating-tables-using-create-all
# http://kronosapiens.github.io/blog/2014/07/29/setting-up-unit-tests-with-flask.html
# http://flask.pocoo.org/docs/0.12/testing/
# http://www.distelli.com/docs/tutorials/test-python-with-unittest/

import os
import unittest
import tempfile
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from decimal import Decimal
from sqlalchemy import exc
from models import Student, Landlord, House, Review
from models import db
from app import app


class OurHouseTestCase(unittest.TestCase):

    def setUp(self):
    	################### Initial Config ######################
    	self.app = Flask(__name__)
    	app.config.from_object(os.environ['APP_SETTINGS'])
    	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    	db.init_app(self.app)
    	with self.app.app_context():
			db.create_all()



    def tearDown(self):
    	db.session.remove()	
    	db.drop_all()

    def test_add_student(self):
        student = Student('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
        db.session.add(student)
        db.session.commit()
        students = Student.query.all()
        assert student in students
        print "NUMBER OF ENTRIES:"
        print len(students)

    # def test_add_landlord(self):
    # 	landlord = Landlord('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
    #     db.session.add(landlord)
    #     db.session.commit()
    #     landlords = Landlord.query.all()
    #     assert landlord in landlords
    #     print "NUMBER OF ENTRIES:"
    #     print len(landlords)

    # def test_already_added_user(self):
    # 	landlord = Landlord('Frankie', 'Robinson', 'frankie.robinson95@gamil.com', 1112223334, True, datetime.now(), datetime.now())
    #     db.session.add(landlord)
    #     try:
    #         db.session.commit()
    #     except exc.IntegrityError:

if __name__ == '__main__':
    unittest.main()