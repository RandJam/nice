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

        # user = {"_id": data["id"],
        #             "name": data["displayName"],
        #             "email": data["emails"][0]["value"],
        #             "gender": data["gender"],
        #             "date": datetime.now()
        #         }
        #
        # collection.insert_one(user)

        users = collection.find()

        niceUsers = json2html.convert(json = users)
        niceData = json2html.convert(json = data)

        print("><><><><><><><><><><")
        print(users)

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


    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app = create_app()
    app.run(debug=True)
