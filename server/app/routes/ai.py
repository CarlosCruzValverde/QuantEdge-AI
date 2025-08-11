from fastapi import APIRouter
from openai import OpenAI
import os
from dotenv import load_dotenv
from app.models.sentiment import AnalysisRequest, AnalysisResponse


# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/ai", tags=["ai"])
client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_sentiment(request: AnalysisRequest):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "Analyze financial sentiment..."},
            {"role": "user", "content": request.text}
        ]
    )
    return AnalysisResponse(
        sentiment="bullish",  # Mock response - parse real API response here
        confidence=0.85,
        reasoning=response.choices[0].message.content
    )