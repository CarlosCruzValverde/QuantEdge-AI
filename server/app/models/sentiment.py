from pydantic import BaseModel

class AnalysisRequest(BaseModel):
    """Request model for sentiment analysis"""
    text: str

class AnalysisResponse(BaseModel):
    """Response model for sentiment analysis"""
    sentiment: str  # "bullish" | "bearish" | "neutral"
    confidence: float
    reasoning: str | None = None