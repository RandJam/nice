import pytest
from server import create_app
from flask import(
    Flask,
    url_for,
    json,
    session
)

class TestApp:

    def test_nice(self, client):
        res = client.get('/')
        # 302 status redirect url status (redirected to logged-in route)
        assert res.status_code == 302

    def test_donate(self, client):
        res = client.get('/donate')
        assert b'Donate with JustGiving' in res.data

    def 
