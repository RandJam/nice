import pytest
from server import create_app

@pytest.fixture
def app():
    app = create_app()
    app.debug = True
    return app

# @pytest.fixture
# def mock_get():
#     return Mock(spec=)
