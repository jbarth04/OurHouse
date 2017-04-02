## developer.py
## contains routes pertaining to devlopers: API docomentation page 

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

@devloper_page.route("/developer", methods=['GET', 'PUT'])