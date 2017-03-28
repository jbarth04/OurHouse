#####################Decimal JSON encoding ################
# http://stackoverflow.com/questions/1960516/python-json-serialize-a-decimal-
# object
# User: tesdal

from flask import Blueprint

serializeDecimalObject_page = Blueprint('serializeDecimalObject_page', __name__)

import json
from decimal import Decimal

class fakefloat(float):
    def __init__(self, value):
        self._value = value
    def __repr__(self):
        return str(self._value)

def defaultencode(o):
    if isinstance(o, Decimal):
        # Subclass float with custom repr?
        return fakefloat(o)
    raise TypeError(repr(o) + " is not JSON serializable")