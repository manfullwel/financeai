from fastapi.testclient import TestClient
from src.api.main import app

client = TestClient(app)

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200

if __name__ == "__main__":
    import pytest
    pytest.main(["-v"])
