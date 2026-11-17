from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

VALID_REQUEST = {
    "incidentId": "6741f0c2a1b2c3d4e5f60718",
    "description": "Plastic dumped near the school gate, call 9876543210",
    "imageUrl": "https://placehold.co/640x400",
    "location": {"lat": 13.0827, "lng": 80.2707},
    "sensitiveLocations": ["school"],
    "affectedArea": "medium",
    "reportedAt": "2026-11-23T10:15:00Z",
    "nearby": [],
    "reportsNearbyLast30d": 3,
}


def test_health_is_ok():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["ok"] is True


def test_analyze_returns_the_contract_shape():
    res = client.post("/analyze", json=VALID_REQUEST)
    assert res.status_code == 200
    assert set(res.json()) == {
        "intake", "vision", "duplicate", "priority",
        "recommendation", "embeddings", "runLog",
    }


def test_analyze_rejects_a_short_description():
    bad = {**VALID_REQUEST, "description": "too short"}
    assert client.post("/analyze", json=bad).status_code == 422


def test_analyze_rejects_an_unknown_affected_area():
    bad = {**VALID_REQUEST, "affectedArea": "huge"}
    assert client.post("/analyze", json=bad).status_code == 422
