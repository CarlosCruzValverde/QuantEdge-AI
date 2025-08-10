from fastapi import APIRouter
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/ai", tags=["ai"])
client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

@router.post("/analyze")
async def analyze_sentiment(text: str):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "Analyze financial sentiment. Respond with JSON."},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content