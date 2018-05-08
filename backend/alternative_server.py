from flask import Flask, jsonify, request, render_template, url_for, session, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'nice_db'
app.config['MONGO_URI'] = 'mongodb://ant:supersecretpassword@ds117200.mlab.com:17200/nice_db'

mongo = PyMongo(app)

@app.route('/')
def index():
    if 'email' in session:
        return jsonify({
        'status': 'OK',
        'message': 'Logged in'
    })

@app.route('/login')
def login():
    return jsonify({

    })


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
