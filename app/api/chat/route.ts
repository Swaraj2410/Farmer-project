
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        // Trim the key to remove any accidental whitespace
        const apiKey = process.env.GEMINI_API_KEY?.trim();

        console.log("--- Debugging /api/chat ---");
        console.log("GEMINI_API_KEY status:", apiKey ? "Present" : "Missing");
        if (apiKey) {
            console.log("GEMINI_API_KEY length:", apiKey.length);
            console.log("GEMINI_API_KEY first 4 chars:", apiKey.substring(0, 4));
            console.log("GEMINI_API_KEY last 4 chars:", apiKey.substring(apiKey.length - 4));
        } else {
            console.log("Environment variables keys:", Object.keys(process.env).filter(k => k.includes('GEMINI')));
        }

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.5-flash as confirmed by list-models.js
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
