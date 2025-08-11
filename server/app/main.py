from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import market, ai

app = FastAPI(title="QuantEdge API")

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Next.js dev URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(market.router)
app.include_router(ai.router)

@app.get("/")
def health_check():
    return {"status": "QuantEdge API is running"}