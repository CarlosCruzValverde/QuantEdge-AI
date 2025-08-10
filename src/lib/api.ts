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

// WebSocket Connection (for real-time data)
export const setupMarketWebSocket = (symbol: string, onMessage: (data: any) => void) => {
    const socket = new WebSocket(`ws://${BASE_URL.replace(/^https?:\/\//, "")}/api/market/ws/${symbol}`);

    socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data));
    };

    return () => socket.close();
};