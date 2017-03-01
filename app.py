from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# # get database info from secret config.py file, NOT pushed to github or heroku
# app.config.from_pyfile('config.py')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # make sure we got the database URL
# if app.config['SQLALCHEMY_DATABASE_URI'] == None:
#     print "Need database config"
#     sys.exit(1)

# db = SQLAlchemy(app)

###################
from sqlalchemy import create_engine, MetaData, Table

engine = create_engine('postgresql:///josie_test', convert_unicode=True)
metadata = MetaData(bind=engine)

students = Table('OurHouse.Students', metadata, autoload=True)
###################

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/houses")
def houses():
	return render_template('houses.html')

if __name__ == "__main__":
    app.run()
