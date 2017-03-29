# $ export APP_SETTINGS="config.DevelopmentConfig"
 # $ export DATABASE_URL="postgresql://username@localhost/OurHouseUnitTest"
 # Exectute: CREATE SCHEMA "OurHouse"
import os
from app import app, db
import unittest
import tempfile
from models import Student
from models import Landlord
from models import House
from models import Review
from datetime import datetime

class OurHouseTestCase(unittest.TestCase):

    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
        app.config['TESTING'] = True
        self.app = app.test_client()
        with app.app_context():
        	db.create_all()
    
    def login(self, email):
		
		return self.app.post(('/'), data=dict(email=email), follow_redirects=True)

    def test_empty_db(self):
    	# print "EMPTY"
    	with app.app_context():
    		houses = House.query.all()
    		landlords = Landlord.query.all()
    		students = Student.query.all()
    		reviews = Review.query.all()
	    	self.assertEquals(houses, [])
	    	self.assertEquals(landlords, [])
	    	self.assertEquals(students, [])
	    	self.assertEquals(reviews, [])

    def test_add_student(self):
    	# print "ADD STUDENT"
    	with app.app_context():
	    	FirstName = "Bob"
	    	LastName = "Job"
	    	Email = "Bob.Job@bobjob.com"
	    	PhoneNum = 1111111111
	    	user = Student(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
	    	db.session.add(user)
	    	db.session.commit()
	    	student = Student.query.first()
	    	student_dict = student.as_dict()
	    	self.assertEquals(student_dict['Email'], Email)
	def test_add_landlord(self):
		# print "ADD LANDLORD"
		with app.app_context():
			FirstName = "Frank"
			LastName = "Tank"
			Email = "Frank.Tank@me.com"
			PhoneNum = 1111111111
			user = Landlord(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
			db.session.add(user)
			db.session.commit()
			landlord = Landlord.query.first()
			landlord_dict = landlord.as_dict()
			self.assertEquals(landlord_dict['Email'], Email)
				# def test_signup(self):
	# 	
		# rv = self.app.post('/newuser', data=dict(
		# 	FirstName = "Job",
	 #    	LastName = "Bob",
	 #    	Email = "Job.Bob@jobbob.com",
	 #    	UserType='Landlord',
	 #    	PhoneNum = 1111111111), follow_redirects=True)
		# with app.app_context():
		# 	landlord = Landlord.query.first()
	 #    	landlord_dict = landlord.as_dict()
	 #    	self.assertEquals(landlord_dict['Email'], "Job.Bob@jobbob.com")
	# def test_add_student(self):
	# 	
 #    	with app.app_context():
	#     	FirstName = "Bob"
	#     	LastName = "Job"
	#     	Email = "Bob.Job@bobjob.com"
	#     	PhoneNum = 1111111111
	#     	user = Student(FirstName, LastName, Email, PhoneNum, True, datetime.now(), datetime.now())
	#     	db.session.add(user)
	#     	db.session.commit()
	#     	student = Student.query.first()
	#     	student_dict = student.as_dict()
	#     	self.assertEquals(student_dict['Email'], Email)
	


    def tearDown(self):
    	with app.app_context():
        	db.drop_all()

if __name__ == '__main__':
    unittest.main()
