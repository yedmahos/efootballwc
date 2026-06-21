import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set in environment" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const prompt = `You are an AI assistant analyzing an eFootball / FIFA match statistics screen.
Extract the following information for BOTH the Home Team (left side) and Away Team (right side):
- Possession (percentage, return as a number from 0 to 100)
- Shots (number)
- Shots on Target (number)
- Corners (number)

Return ONLY a valid JSON object in this exact format, with no markdown formatting or other text:
{
  "home": { "possession": 50, "shots": 10, "shotsOnTarget": 5, "corners": 3 },
  "away": { "possession": 50, "shots": 8, "shotsOnTarget": 4, "corners": 2 }
}
Make sure the numbers are integers. If you cannot find a stat, default to 0.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini API");
    }

    const stats = JSON.parse(text);

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Error parsing stats:", error);
    return NextResponse.json({ error: error.message || "Failed to parse stats" }, { status: 500 });
  }
}
