import pytest
from app.main import app
from fastapi.testclient import TestClient

@pytest.fixture
def client():
    return TestClient(app)

# Database fixture example
"""@pytest.fixture(scope="module")
def test_db():
    from app.models.base import Base, engine
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)"""