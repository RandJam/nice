from flask import Flask, jsonify, request, render_template, url_for, session, redirect, Response
# from flask_pymongo import PyMongo
from functools import wraps
from flask_basicauth import BasicAuth
import requests
import json
import random


import pymongo
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient('mongodb://ant:supersecretpassword@ds117200.mlab.com:17200/nice_db')
db = client.nice_db
charities = db.charities

@app.route("/donate")
def donate():
    data = get_charity_list()
    jsondata = data.json()
    results = (jsondata["GroupedResults"][0]["Results"])
    for element in results:
        charityId = element["Id"]
        charityName = element["Name"]
        charity = {"Id": charityId, "Name": charityName}
        save_list(charity)
    count = charities.count()
    charity = charities.find()[random.randrange(count)]

    charityId = {"charityId": charity["Id"]}
    print (charityId)
    return jsonify(charityId)

def get_charity_list():
    url = "https://api.justgiving.com/6fc965bd/v1/onesearch"
    querystring = {"i":"charity","limit":"25"}
    headers = {
        'accept': "application/json",
        'cache-control': "no-cache",
        'postman-token': "c939aba2-22a3-e897-4fd5-3bfe3c93755d"
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    return response

def save_list(charity):
    try:
        charities.insert_one(charity)
    except Exception as e:
        error = str(e)
        return error

@app.route("/thanks")
def thanks():
    jgDonationId = request.args.get('jgDonationId')

    donation = get_donation(jgDonationId)
    charityId = donation["charityId"]
    donorName = donation["donorDisplayName"]
    charityDetails = get_charity_details(charityId)
    amount = donation["amount"]
    currency = donation["donorLocalCurrencyCode"]
    charityName = charityDetails["name"]
    charityDescription = charityDetails["description"]

    return f"thanks very much, {donorName}. you have just given {currency}{amount} to ISIS. Just kidding, it's actually {charityName} and your donation ID is {jgDonationId}<br><br><br>{charityDescription}"


def get_donation(jgDonationId):
    url = f"https://api.justgiving.com/6fc965bd/v1/donation/{jgDonationId}"
    headers = {
        'accept': "application/json",
        'cache-control': "no-cache",
        'postman-token': "8f302b74-0bb4-451c-e4f3-7663ab52ca0e"
        }
    response = requests.request("GET", url, headers=headers)
    return (response.json())


def get_charity_details(charityId):
    url = f"https://api.justgiving.com/6fc965bd/v1/charity/{charityId}"
    headers = {
        'accept': "application/json",
        'cache-control': "no-cache",
        'postman-token': "bce62850-664f-5c2a-317b-e5cdd0417d31"
        }
    response = requests.request("GET", url, headers=headers)
    return (response.json())

if __name__ == '__main__':
    # app.run(debug=True, host='https://averyniceapp.herokuapp.com')
    app.run(debug=True, host='0.0.0.0')
