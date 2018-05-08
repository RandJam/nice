import os
import logging
import flask
import requests
import pymongo
from pymongo import MongoClient
# from requests_oauth2.services import GoogleClient
# from requests_oauth2 import OAuth2BearerToken
from datetime import datetime
from json2html import *
from flask import (
    Flask,
    request,
    Response,
    abort,
    jsonify,
    redirect,
    session
)
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery


client = MongoClient('mongodb://localhost:27017/')
db = client.nice_database
collection = db.all_data

def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(20)

    # google_auth = GoogleClient(
    #     client_id=("248542313858-cs7m96ilu4c4hckonl72c2n02teutmf6.apps.googleusercontent.com"),
    #     client_secret="k0Hl36IMGER0h9rRhZckEg7Q",
    #     redirect_uri="http://localhost:5000/google/oauth2callback",
    # )


    # This variable specifies the name of a file that contains the OAuth 2.0
    # information for this application, including its client_id and client_secret.
    CLIENT_SECRETS_FILE = 'client_secrets.json'

    # This OAuth 2.0 access scope allows for full read/write access to the
    # authenticated user's account and requires requests to use an SSL connection.
    SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
    API_SERVICE_NAME = 'drive'
    API_VERSION = 'v2'

    app = flask.Flask(__name__)
    # Note: A secret key is included in the sample so that it works.
    # If you use this code in your application, replace this with a truly secret
    # key. See http://flask.pocoo.org/docs/0.12/quickstart/#sessions.
    # app.secret_key = "k0Hl36IMGER0h9rRhZckEg7Q"


    @app.route('/')
    def index():
      return print_index_table()


    @app.route('/test')
    def test_api_request():
      if 'credentials' not in flask.session:
        return flask.redirect('authorize')

      # Load credentials from the session.
      credentials = google.oauth2.credentials.Credentials(
          **flask.session['credentials'])

      drive = googleapiclient.discovery.build(
          API_SERVICE_NAME, API_VERSION, credentials=credentials)

      files = drive.files().list().execute()

      # Save credentials back to session in case access token was refreshed.
      # ACTION ITEM: In a production app, you likely want to save these
      #              credentials in a persistent database instead.
      flask.session['credentials'] = credentials_to_dict(credentials)

      return flask.jsonify(**files)


    @app.route('/authorize')
    def authorize():
      # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
      flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(CLIENT_SECRETS_FILE, scopes=SCOPES)

      flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

      authorization_url, state = flow.authorization_url(
          # Enable offline access so that you can refresh an access token without
          # re-prompting the user for permission. Recommended for web server apps.
          access_type='offline',
          # Enable incremental authorization. Recommended as a best practice.
          include_granted_scopes='true')

      # Store the state so the callback can verify the auth server response.
      flask.session['state'] = state

      return flask.redirect(authorization_url)


    @app.route('/oauth2callback')
    def oauth2callback():
      # Specify the state when creating the flow in the callback so that it can
      # verified in the authorization server response.
      state = flask.session['state']

      flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
          CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
      flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

      # Use the authorization server's response to fetch the OAuth 2.0 tokens.
      authorization_response = flask.request.url
      flow.fetch_token(authorization_response=authorization_response)

      # Store credentials in the session.
      # ACTION ITEM: In a production app, you likely want to save these
      #              credentials in a persistent database instead.
      credentials = flow.credentials
      flask.session['credentials'] = credentials_to_dict(credentials)

      return flask.redirect(flask.url_for('test_api_request'))


    @app.route('/revoke')
    def revoke():
      if 'credentials' not in flask.session:
        return ('You need to <a href="/authorize">authorize</a> before ' +
                'testing the code to revoke credentials.')

      credentials = google.oauth2.credentials.Credentials(
        **flask.session['credentials'])

      revoke = requests.post('https://accounts.google.com/o/oauth2/revoke',
          params={'token': credentials.token},
          headers = {'content-type': 'application/x-www-form-urlencoded'})

      status_code = getattr(revoke, 'status_code')
      if status_code == 200:
        return('Credentials successfully revoked.' + print_index_table())
      else:
        return('An error occurred.' + print_index_table())


    @app.route('/clear')
    def clear_credentials():
      if 'credentials' in flask.session:
        del flask.session['credentials']
      return ('Credentials have been cleared.<br><br>' +
              print_index_table())


    def credentials_to_dict(credentials):
      return {'token': credentials.token,
              'refresh_token': credentials.refresh_token,
              'token_uri': credentials.token_uri,
              'client_id': credentials.client_id,
              'client_secret': credentials.client_secret,
              'scopes': credentials.scopes}

    def print_index_table():
      return ('<table>' +
              '<tr><td><a href="/test">Test an API request</a></td>' +
              '<td>Submit an API request and see a formatted JSON response. ' +
              '    Go through the authorization flow if there are no stored ' +
              '    credentials for the user.</td></tr>' +
              '<tr><td><a href="/authorize">Test the auth flow directly</a></td>' +
              '<td>Go directly to the authorization flow. If there are stored ' +
              '    credentials, you still might not be prompted to reauthorize ' +
              '    the application.</td></tr>' +
              '<tr><td><a href="/revoke">Revoke current credentials</a></td>' +
              '<td>Revoke the access token associated with the current user ' +
              '    session. After revoking credentials, if you go to the test ' +
              '    page, you should see an <code>invalid_grant</code> error.' +
              '</td></tr>' +
              '<tr><td><a href="/clear">Clear Flask session credentials</a></td>' +
              '<td>Clear the access token currently stored in the user session. ' +
              '    After clearing the token, if you <a href="/test">test the ' +
              '    API request</a> again, you should go back to the auth flow.' +
              '</td></tr></table>')


    if __name__ == '__main__':
      # When running locally, disable OAuthlib's HTTPs verification.
      # ACTION ITEM for developers:
      #     When running in production *do not* leave this option enabled.
      os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'













    # @app.route("/")
    # def index():
    #     return redirect("/logged-in/")
    #
    # @app.route("/donate")
    # def donate():
    #     button = '<a href="https://link.justgiving.com/v1/charity/donate/charityId/189689?amount=5.00&currency=GBP&reference=be_nice&exitUrl=http%3A%2F%2Flocalhost%3A5000%2Fthanks%3FjgDonationId%3DJUSTGIVING-DONATION-ID&message=Its-good%20be%20be%20bad%20but%20being%20nice%20doesnt%20hurt%20either."><img src="https://vignette.wikia.nocookie.net/deep-space-69/images/9/99/Nice.png/revision/latest?cb=20130604210952" alt="Donate with JustGiving" /></a>'
    #     return f"text {button}"
    #
    # @app.route("/thanks")
    # def thanks():
    #     gid = request.args.get('jgDonationId')
    #     print ("><><><><><><><><><><><><><")
    #     print (gid)
    #     return f"Donation Id Number: {gid}"
    #
    # @app.route("/logged-in/")
    # def google_index():
    #     if not session.get("access_token"):
    #         return redirect("/google/oauth2callback")
    #     with requests.Session() as s:
    #         s.auth = OAuth2BearerToken(session["access_token"])
    #         r = s.get("https://www.googleapis.com/plus/v1/people/me")
    #     r.raise_for_status()
    #     data = r.json()
    #     name = data["displayName"]
    #     emails = data["emails"][0]["value"]
    #
    #     try:
    #         gender = data["gender"],
    #     except Exception as e:
    #         gender = "not given",
    #
    #     user = {"_id": data["id"],
    #                 "name": data["displayName"],
    #                 "email": data["emails"][0]["value"],
    #                 "gender": gender,
    #                 "date": datetime.now()
    #             }
    #     try:
    #         collection.insert_one(user)
    #     except Exception as e:
    #         error = str(e)
    #
    #     # collection.delete_one({"_id":"106892412375491885318"})
    #
    #     users = [element for element in collection.find()]
    #     # users = list(collection.find())
    #
    #
    #     niceUsers = json2html.convert(json = users)
    #     niceData = json2html.convert(json = data)
    #
    #     print("><><><><><><><><><><")
    #     return f"Hello, {name}! Your email address is, {emails}<br/><br/>{niceData}<br/><br/><br/>{niceUsers}"
    #
    #
    # @app.route("/google/oauth2callback")
    # def google_oauth2callback():
    #     code = request.args.get("code")
    #     error = request.args.get("error")
    #     if error:
    #         return "error :( {!r}".format(error)
    #     if not code:
    #         return redirect(google_auth.authorize_url(
    #             scope=["profile", "email"],
    #             response_type="code",
    #         ))
    #     data = google_auth.get_token(
    #         code=code,
    #         grant_type="authorization_code",
    #     )
    #     session["access_token"] = data.get("access_token")
    #
    #
    #     return redirect("/")
    #
    # # Experimental route - seeing if we can use oAuth with JustGiving
    # @app.route("/jg/")
    # def jg_index():
    #     if not session.get("access_token"):
    #         return "not logged in"
    #     with requests.Session() as s:
    #         s.auth = OAuth2BearerToken(session["access_token"])
    #         r = s.get("http://api.justgiving.com/v1/account/getconsumerdetails")
    #     r.raise_for_status()
    #     data = r.json()
    #
    #     return data
    #
    # @app.route('/test')
    # def test_api_request():
    #   if 'credentials' not in flask.session:
    #     return flask.redirect('authorize')
    #
    #   # Load credentials from the session.
    #   credentials = google.oauth2.credentials.Credentials(
    #       **flask.session['credentials'])
    #
    #   drive = googleapiclient.discovery.build(
    #       API_SERVICE_NAME, API_VERSION, credentials=credentials)
    #
    #   files = drive.files().list().execute()
    #
    #   # Save credentials back to session in case access token was refreshed.
    #   # ACTION ITEM: In a production app, you likely want to save these
    #   #              credentials in a persistent database instead.
    #   flask.session['credentials'] = credentials_to_dict(credentials)
    #
    #   return flask.jsonify(**files)


    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app = create_app()
    app.run(debug=True, host='0.0.0.0')
