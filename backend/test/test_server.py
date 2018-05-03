import pytest
from server import create_app
from flask import(
    Flask,
    url_for,
    json
)

class TestApp:

    def test_nice(self, client):
        res = client.get('/')
        assert res.status_code == 200
