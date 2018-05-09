import mock
import pytest
from mock import Mock
from splinter import Browser
from server import create_app
from flask import(
    Flask,
    url_for,
    json,
    session,
    request
)

class TestApp:

    browser = Browser()

    def test_nice(self, client):
        res = client.get('/')
        # 302 status redirect url status (redirected to logged-in route)
        assert res.status_code == 302

    def test_donate(self, client):
        res = client.get('/donate')
        assert b'Donate with JustGiving' in res.data

    def test_thanks_content(self, client):
        res = client.get('/thanks')
        assert b'Donation Id Number: ' in res.data


    def test_thanks_request(self, browser):
        url = 'http://localhost:5000/thanks'
        browser.visit(url)
        assert browser.is_text_present('Donation Id Number: ')
        browser.quit()

#
# def test_some_browser_stuff(browser):
#     """Test using real browser."""
#     url = "http://www.google.com"
#     browser.visit(url)
#     browser.fill('q', 'splinter - python acceptance testing for web applications')
#     # Find and click the 'search' button
#     button = browser.find_by_name('btnK')
#     # Interact with elements
#     button.click()
#     assert browser.is_text_present('splinter.cobrateam.info'), 'splinter.cobrateam.info wasn't found... We need to'
#     ' improve our SEO techniques'


# class TestMockerStub:
#     def test_call(self, mocker):
#         stub = mocker.stub()
#         stub('get', 'bar')
#         stub.assert_called_once_with('foo', 'bar')
