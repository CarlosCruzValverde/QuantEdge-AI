import os

# Mock environment
os.environ["OPENAI_API_KEY"] = "test-key"

def test_ai_analysis(client):  # Client fixture from conftest.py
    response = client.post(
        "/api/ai/analyze",
        json={"text": "Tesla stock outlook"}
    )
    assert response.status_code == 200
    assert "sentiment" in response.json()