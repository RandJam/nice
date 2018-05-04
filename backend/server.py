from datetime import datetime
from flask import (
    Flask,
    request,
    abort,
    jsonify
)

def create_app():
    app = Flask(__name__)



    @app.route('/')
    def nice():
        return jsonify(welcome = 'Welcome to a nice app...be nice!')
        







    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
