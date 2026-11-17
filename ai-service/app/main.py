from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

from app import config

app = FastAPI(title="EcoResolve AI service", version="0.1.0")


# ---------- Request contract (sent by the Node API) ----------
class Location(BaseModel):
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)


class NearbyIncident(BaseModel):
    incidentId: str
    distanceM: float
    reportedAt: str
    imageEmbedding: list[float] = []
    textEmbedding: list[float] = []


class AnalyzeRequest(BaseModel):
    incidentId: str
    description: str = Field(min_length=20, max_length=1000)  # FR-04
    imageUrl: str
    location: Location
    sensitiveLocations: list[Literal["school", "hospital", "water_body", "residential"]] = []
    affectedArea: Literal["small", "medium", "large"]
    reportedAt: str
    nearby: list[NearbyIncident] = []          # within 100 m and 72 h
    reportsNearbyLast30d: int = Field(default=0, ge=0)  # within 200 m and 30 days


# ---------- Endpoints ----------
@app.get("/health")
def health():
    # modelsLoaded becomes True in week 3, once CLIP and MiniLM load at startup
    return {"ok": True, "modelsLoaded": False, "mode": "stub"}


@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    # STUB: fixed JSON in the agreed response shape. In week 3 each agent
    # replaces its own key; the shape never changes, so the Node API never changes.
    confidence = 0.71
    return {
        "intake": {
            "valid": True,
            "maskedDescription": "Plastic dumped near the school gate, call [PHONE]",
            "maskedCount": 1,
        },
        "vision": {
            "category": "plastic_waste",
            "confidence": confidence,
            "needsReview": confidence < config.CONFIDENCE_THRESHOLD,
            "scores": {"plastic_waste": 0.71, "mixed_waste": 0.18, "sewage": 0.04},
        },
        "duplicate": {
            "isDuplicate": False,
            "matchId": None,
            "imageSimilarity": 0.62,
            "textSimilarity": 0.41,
            "distanceM": 42,
        },
        "priority": {
            "score": 0.74,
            "band": "High",
            "factors": [
                {"name": "issueSeverity", "value": 0.5, "weight": 0.30, "contribution": 0.15}
            ],
        },
        "recommendation": {
            "department": "Solid Waste Management",
            "precautions": ["Keep children away from the dump site"],
            "actionSteps": ["Log with the ward office", "Schedule collection"],
            "sources": [{"title": "Source title", "url": "#"}],
        },
        "embeddings": {"image": [0.012, -0.034], "text": [0.051, 0.007]},
        "runLog": [
            {"agent": "intake", "ms": 4, "ok": True},
            {"agent": "vision", "ms": 2310, "ok": True},
        ],
    }