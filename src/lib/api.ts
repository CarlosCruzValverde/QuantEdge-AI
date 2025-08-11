// Base URL configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Utility for handling responses
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "API request failed");
    }
    return response.json();
};

// Market Data API
export const fetchMarketData = async (symbol: string) => {
    const response = await fetch(`${BASE_URL}/api/market/${symbol}`);
    return handleResponse(response);
};

// AI Sentiment Analysis
export const analyzeSentiment = async (text: string) => {
    const response = await fetch(`${BASE_URL}/api/ai/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    return handleResponse(response);
};

// Define an interface for your WebSocket data
interface MarketWebSocketData {
    // Define the expected properties and their types
    symbol: string;
    price: number;
    timestamp: string;
    // Add other relevant fields based on your API response
    // Example:
    // change: number;
    // volume: number;
}

// WebSocket Connection (for real-time data)
export const setupMarketWebSocket = (
    symbol: string,
    onMessage: (data: MarketWebSocketData) => void
) => {
    const socket = new WebSocket(`ws://${BASE_URL.replace(/^https?:\/\//, "")}/api/market/ws/${symbol}`);

    socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data) as MarketWebSocketData);
    };

    return () => socket.close();
};