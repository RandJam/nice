import mock
import pytest
from mock import Mock
from server import create_app
from flask import(
    Flask,
    url_for,
    json,
    session,
    request
)

class TestApp:

    def test_nice(self, client):
        res = client.get('/')
        # 302 status redirect url status (redirected to logged-in route)
        assert res.status_code == 302

    def test_donate(self, client):
        res = client.get('/donate')
        assert b'Donate with JustGiving' in res.data

    def test_thanks(self, client):
        res = client.get('/thanks')
        assert b'Donation Id Number: ' in res.data



# class TestMockerStub:
#     def test_call(self, mocker):
#         stub = mocker.stub()
#         stub('get', 'bar')
#         stub.assert_called_once_with('foo', 'bar')
