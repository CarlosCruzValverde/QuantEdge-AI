from fastapi import APIRouter, WebSocket
from typing import Dict
import json

router = APIRouter(prefix="/api/market", tags=["market"])

@router.websocket("/ws/{symbol}")
async def websocket_endpoint(websocket: WebSocket, symbol: str):
    await websocket.accept()
    while True:
        # Replace with real market data feed
        data = {"symbol": symbol, "price": 150.75, "volume": 1000}
        await websocket.send_json(data)