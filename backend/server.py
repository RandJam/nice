from datetime import datetime
from flask import (
    Flask,
    request,
    Response,
    abort,
    jsonify
)

def create_app():
    app = Flask(__name__)



    @app.route('/')
    def nice():
        return "hello\n"

        # return jsonify(welcome = 'Welcome to a nice app...be nice!')








    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0')
