import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

def test_market_data_websocket(client):
    """Test WebSocket connection"""
    with client.websocket_connect("/api/market/ws/AAPL") as ws:
        data = ws.receive_json()
        assert "price" in data
        assert isinstance(data["price"], float)  # Additional validation