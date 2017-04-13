## photo.py 
## contains routes pertaining to uploading and getting house photos

from flask import Flask, request
from flask_store import Store
from datetime import datetime
from sqlalchemy import exc
from flask import jsonify
import json

import os

from models import db
from models import Photo

from flask import Blueprint

photo_page = Blueprint('photo_page', __name__)

store = Store()

from app import mc

import serializeDecimalObject

def find(name, path):
    for root, dirs, files in os.walk(path):
        if name in files:
            return os.path.join(root, name)


@photo_page.route('/testupload', methods=['POST', ])
def upload():
    print "HERE"
    base64ImageUrl = request.form["imageUrl"]
    # decoding base64: http://stackoverflow.com/questions/2323128/convert-string-in-base64-to-image-and-save-on-filesystem-in-python
    urlList = base64ImageUrl.split(",")
    imageBase64 =  urlList[-1]
    with open("imageToSave.png", "wb") as fh:
        fh.write(imageBase64.decode('base64'))
    print find("imageToSave.png", ".")


    # provider = store.Provider(request.files.get('afile'))
    # provider.save()
    # return provider.absolute_url
    return jsonify([])

@photo_page.route('/upload_photo', methods=['POST', ])
def upload_photo():
    if request.method == 'POST':

        # TODO probs need to do sessions stuff here

        # Step 1: check if the post request has the file part
        if 'File' not in request.files:
            return jsonify([{'status':400, 'message':'Must attach a file to upload'}])

        HouseId = int(request.form['HouseId'])
        RelativePath = request.files.get('File')

        # Step 2: upload relative path to database, note - Flask automatically
        #         uploads the image to S3 bucket     
        photo = Photo(HouseId, RelativePath, datetime.now(), datetime.now())
        db.session.add(photo)

        try:
            db.session.commit()
            mc.delete("Houses") # flush cache, it's now stale
            mc.delete("AllIds") # flush cache, it's now stale
        except exc.IntegrityError:
            return jsonify([{'status':400, 'message':'This HouseId is not valid'}])
        else:
            # Step 3: Return success status 
            return jsonify([{'status':200, 'message': 'Your image was successfully saved!'}])

@photo_page.route('/get_photos/houseid=<HouseId>', methods=['GET', ])
def get_photos(HouseId):

    # TODO probs need to do sessions stuff here

    photos = Photo.query.filter_by(HouseId=HouseId).all()

    # TODO, query if there are no photos associated a house
    if photos == None:
        return jsonify([{'status':200, 'AbsoluteURLs': []}])

    # Return an array of absolute URL of photos
    allPhotos = [p.as_dict() for p in photos]
    allPhotoURLS = []
    for p in allPhotos:
        allPhotoURLS.append((p['RelativePath']).absolute_url)

    # TODO - maybe not needed
    # jsonPhotoURLs = json.dumps(allPhotoURLS, default=serializeDecimalObject.defaultencode)
    # return jsonify([{'status':200, 'AbsoluteURLs': jsonPhotoURLs}]

    return jsonify([{'status':200, 'AbsoluteURLs': allPhotoURLS}])


# TODO TESTING
# @photo_page.route('/upload', methods=['POST', ])
# def upload():
#     provider = store.Provider(request.files.get('afile'))
#     provider.save()
#     return provider.absolute_url

