from flask import Flask, jsonify, request, render_template, url_for, session, redirect, Response
from flask_pymongo import PyMongo
from functools import wraps
from flask_basicauth import BasicAuth
import requests
import json




# from pymongo import MongoClient
# from bson.son import SON



app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'nice_db'
app.config['MONGO_URI'] = 'mongodb://ant:supersecretpassword@ds117200.mlab.com:17200/nice_db'

mongo = PyMongo(app)
charities = mongo.db.charities

# app.config['BASIC_AUTH_FORCE'] = True

















@app.route("/donate")
def donate():
    button = '<a href="https://link.justgiving.com/v1/charity/donate/charityId/189689?amount=5.00&currency=GBP&reference=be_nice&exitUrl=http%3A%2F%2Flocalhost%3A5000%2Fthanks%3FjgDonationId%3DJUSTGIVING-DONATION-ID&message=Its-good%20be%20be%20bad%20but%20being%20nice%20doesnt%20hurt%20either."><img src="https://vignette.wikia.nocookie.net/deep-space-69/images/9/99/Nice.png/revision/latest?cb=20130604210952" alt="Donate with JustGiving" /></a>'
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

    print (charity["Id"])

    return f"text {button}<br><br><br><br>"

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
    print ("<><><><> Charity added to database <><><><>")


@app.route("/thanks")
def thanks():
    jgDonationId = request.args.get('jgDonationId')

    url = f"http://api.sandbox.justgiving.com/6fc965bd/v1/charity/"

    headers = {
        'Authorization': "Basic YW50Y2luOnBhc3N3b3JkMTIzNA==",
        'Cache-Control': "no-cache",
        'Postman-Token': "b5f335c3-b26a-4a65-9a3c-9828bc35f243"
        }

    # response = requests.request("GET", url, headers=headers)


    # bal = jsonify(response.text)
    # (response.text)
    # return f"Donation Id Number: {gid} <br><br><br> {response.text}"
    print (jgDonationId)


@app.route('/deeds', methods=['GET'])
def get_all_deeds():
    deeds = mongo.db.deeds

    output = []

    for query in deeds.find():
        output.append({'name' : query['name'], 'description' : query['description']})

    return jsonify(output)


@app.route('/deeds/<name>', methods=['GET'])
def get_one_framework(name):
    deeds = mongo.db.deeds

    query = deeds.find_one({'name' : name})

    if query:
        output = {'name' : query['name'], 'description' : query['description']}
    else:
        output = 'No results found'

    return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
