from fastapi import APIRouter
from openai import OpenAI
import os
from dotenv import load_dotenv
from pydantic import BaseModel

class AnalysisRequest(BaseModel):
    text: str

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/ai", tags=["ai"])
client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

@router.post("/analyze")
async def analyze_sentiment(request: AnalysisRequest):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{
            "role": "system",
            "content": "Analyze financial sentiment. Respond with JSON."
        }]
    )
    return response.choices[0].message.content