import { OpenAI } from "openai";

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OpenAI API key not configured");
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            response_format: { type: "json_object" }, // Ensure JSON output
            messages: [
                {
                    role: "system",
                    content: `Analyze sentiment of this financial text. 
                   Respond with JSON: { 
                     sentiment: "bullish" | "neutral" | "bearish", 
                     confidence: number 
                   }`,
                },
                { role: "user", content: text },
            ],
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("No response from AI");

        return Response.json(JSON.parse(content));

    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Analysis failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}