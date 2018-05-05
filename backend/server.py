import os
import logging
import requests
import pymongo
from pymongo import MongoClient
from requests_oauth2.services import GoogleClient
from requests_oauth2 import OAuth2BearerToken
from datetime import datetime
from json2html import *
from flask import (
    Flask,
    request,
    abort,
    jsonify,
    redirect,
    session
)

client = MongoClient('mongodb://localhost:27017/')
db = client.nice_database
collection = db.all_data

def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(20)

    google_auth = GoogleClient(
        client_id=("248542313858-cs7m96ilu4c4hckonl72c2n02teutmf6.apps.googleusercontent.com"),
        client_secret="k0Hl36IMGER0h9rRhZckEg7Q",
        redirect_uri="http://localhost:5000/google/oauth2callback",
    )


    @app.route("/")
    def index():
        return redirect("/logged-in/")

    @app.route("/donate")
    def donate():
        button = '<a href="https://link.justgiving.com/v1/charity/donate/charityId/189689?amount=5.00&currency=GBP&reference=be_nice&exitUrl=http%3A%2F%2Flocalhost%3A5000%2Fthanks%3FjgDonationId%3DJUSTGIVING-DONATION-ID&message=Its-good%20be%20be%20bad%20but%20being%20nice%20doesnt%20hurt%20either."><img src="https://vignette.wikia.nocookie.net/deep-space-69/images/9/99/Nice.png/revision/latest?cb=20130604210952" alt="Donate with JustGiving" /></a>'
        return f"text {button}"

    @app.route("/thanks")
    def thanks():
        gid = request.args.get('jgDonationId')
        print ("><><><><><><><><><><><><><")
        print (gid)
        return f"Donation Id Number: {gid}"

    @app.route("/logged-in/")
    def google_index():
        if not session.get("access_token"):
            return redirect("/google/oauth2callback")
        with requests.Session() as s:
            s.auth = OAuth2BearerToken(session["access_token"])
            r = s.get("https://www.googleapis.com/plus/v1/people/me")
        r.raise_for_status()
        data = r.json()
        name = data["displayName"]
        emails = data["emails"][0]["value"]

        try:
            gender = data["gender"],
        except Exception as e:
            gender = "not given",

        user = {"_id": data["id"],
                    "name": data["displayName"],
                    "email": data["emails"][0]["value"],
                    "gender": gender,
                    "date": datetime.now()
                }
        try:
            collection.insert_one(user)
        except Exception as e:
            error = str(e)

        # collection.delete_one({"_id":"106892412375491885318"})

        users = [element for element in collection.find()]
        # users = list(collection.find())


        niceUsers = json2html.convert(json = users)
        niceData = json2html.convert(json = data)

        print("><><><><><><><><><><")
        return f"Hello, {name}! Your email address is, {emails}<br/><br/>{niceData}<br/><br/><br/>{niceUsers}"


    @app.route("/google/oauth2callback")
    def google_oauth2callback():
        code = request.args.get("code")
        error = request.args.get("error")
        if error:
            return "error :( {!r}".format(error)
        if not code:
            return redirect(google_auth.authorize_url(
                scope=["profile", "email"],
                response_type="code",
            ))
        data = google_auth.get_token(
            code=code,
            grant_type="authorization_code",
        )
        session["access_token"] = data.get("access_token")


        return redirect("/")

    # Experimental route - seeing if we can use oAuth with JustGiving
    @app.route("/jg/")
    def jg_index():
        if not session.get("access_token"):
            return "not logged in"
        with requests.Session() as s:
            s.auth = OAuth2BearerToken(session["access_token"])
            r = s.get("http://api.justgiving.com/v1/account/getconsumerdetails")
        r.raise_for_status()
        data = r.json()

        return data


    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app = create_app()
    app.run(debug=True)
