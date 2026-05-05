import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { text, voiceName = "Kore" } = body;

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Speak naturally and clearly:\n\n${text}`,
            },
          ],
        },
      ],

      config: {
        responseModalities: ["AUDIO"],

        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName,
            },
          },
        },
      },
    });

    const audioData =
      response.candidates?.[0]?.content?.parts?.[0]
        ?.inlineData?.data;

    if (!audioData) {
      return NextResponse.json(
        { error: "No audio generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      audio: audioData,
    });
  } catch (error) {
    console.error("TTS API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}