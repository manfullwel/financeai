import pytest
from fastapi.testclient import TestClient
from src.api.main import app

@pytest.fixture
def test_app():
    return app

def test_health_check(test_app):
    client = TestClient(test_app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_root(test_app):
    client = TestClient(test_app)
    response = client.get("/")
    assert response.status_code == 200
