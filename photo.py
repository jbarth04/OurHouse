## photo.py 
## contains routes pertaining to uploading and getting house photos

from flask import Flask, request, render_template, jsonify, redirect, url_for, session
from flask_store import Store
from datetime import datetime
from sqlalchemy import exc
from flask import jsonify
from werkzeug.datastructures import FileStorage
import json

import os

from models import db
from models import Photo

from flask import Blueprint

photo_page = Blueprint('photo_page', __name__)

store = Store()

import serializeDecimalObject

@photo_page.route('/upload_photo', methods=['POST', ])
def upload_photo():
    if request.method == 'POST':
        # TODO probs need to do sessions stuff here
        #http://werkzeug.pocoo.org/docs/0.11/datastructures/#werkzeug.datastructures.FileStorage

        # Step 1: check if the post request has the file part -- if doing with a request.files not base64
        #         encoded string
        # if 'File' not in request.files:
        #     return jsonify([{'status':400, 'message':'Must attach a file to upload'}])

        # Step 1: get the base64 encoded image and decode into a temp file and create a FileStorage object
        base64ImageUrl = request.form["imagePreviewUrl"]
        if base64ImageUrl == None or base64ImageUrl == "":
            return jsonify([{'status':400, 'message':'Must attach a file to upload'}])
        urlList = base64ImageUrl.split(",")
        # grabs just the base64 encoding from the string 
        imageBase64 =  urlList[-1]
        # Grab the other information from the post
        HouseId = int(request.form['HouseId'])

        filename = "house_" + str(HouseId) + ".png"
        with open(filename, "w+b") as fh:
            fh.write(imageBase64.decode('base64'))
            RelativePath = FileStorage(fh)
            print RelativePath

            # Step 2: upload relative path to database, note - Flask automatically
            #         uploads the image to S3 bucket   
            photo = Photo(HouseId, RelativePath, datetime.now(), datetime.now())
            db.session.add(photo)

            try:
                db.session.commit()
            except exc.IntegrityError:
                return jsonify({'status':400, 'message':'This HouseId is not valid'})
            else:
                print "GOT TO HERE"
                RelativePath.save("test1.png")
                RelativePath.close()
                #TODO: delete file once stored...
                # Step 3: Return success status 
                return jsonify({'status':200, 'message': 'Your image was successfully saved!'})

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

@photo_page.route('/image_uploader=<houseID>', methods=['GET'])
def uploader(houseID):
    usertype = {"type": session['usertype']}
    return render_template('image_upload.html', houseID=houseID, usertype=usertype)

# TODO TESTING
# @photo_page.route('/upload', methods=['POST', ])
# def upload():
#     provider = store.Provider(request.files.get('afile'))
#     provider.save()
#     return provider.absolute_url
