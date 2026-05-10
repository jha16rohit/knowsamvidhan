import { NextRequest, NextResponse } from "next/server";

import WebSocket from "ws";

import {
  generateGeminiSpeech,
  GEMINI_MODELS,
  pcmToWav,
} from "@/lib/generateSpeech";

export const runtime = "nodejs";

async function tryGeminiProviders(
  text: string,
  voiceName: string
) {
  for (const model of GEMINI_MODELS) {
    try {
      console.log(
        `[TTS] Trying Gemini model: ${model}`
      );

      const base64Audio =
        await generateGeminiSpeech(
          text,
          voiceName,
          model
        );

      return {
        provider: model,
        audio: base64Audio,
      };
    } catch (error) {
      console.error(
        `[TTS] ${model} failed`,
        error
      );
    }
  }

  return null;
}

async function tryGrokProvider(
  text: string
): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const ws = new WebSocket(
      "wss://api.x.ai/v1/realtime?model=grok-voice-think-fast-1.0",
      {
        headers: {
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
        },
      }
    );

    const audioChunks: Buffer[] = [];

    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          type: "session.update",

          session: {
            voice: "eve",

            instructions:
              "Speak naturally and clearly.",

            turn_detection: {
              type: "server_vad",
            },
          },
        })
      );

      ws.send(
        JSON.stringify({
          type: "conversation.item.create",

          item: {
            type: "message",
            role: "user",

            content: [
              {
                type: "input_text",
                text,
              },
            ],
          },
        })
      );

      ws.send(
        JSON.stringify({
          type: "response.create",
        })
      );
    });

    ws.on("message", (data) => {
      try {
        const event = JSON.parse(
          data.toString()
        );

        if (
          event.type ===
            "response.audio.delta" &&
          event.delta
        ) {
          audioChunks.push(
            Buffer.from(
              event.delta,
              "base64"
            )
          );
        }

        if (
          event.type ===
          "response.completed"
        ) {
          const audioBuffer =
            Buffer.concat(audioChunks);

          resolve(audioBuffer);

          ws.close();
        }
      } catch (error) {
        console.error(
          "[TTS] Grok parse error",
          error
        );

        resolve(null);
      }
    });

    ws.on("error", (error) => {
      console.error(
        "[TTS] Grok failed",
        error
      );

      resolve(null);
    });

    ws.on("close", () => {
      console.log("[TTS] Grok closed");
    });
  });
}

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const {
      text,
      voiceName = "Algenib",
    } = body;

    if (!text) {
      return NextResponse.json(
        {
          error: "Text is required",
        },
        {
          status: 400,
        }
      );
    }

    /*
     --------------------------------
     GEMINI STACK
     --------------------------------
    */

    const geminiResult =
      await tryGeminiProviders(
        text,
        voiceName
      );

    if (geminiResult) {
      return NextResponse.json({
        provider:
          geminiResult.provider,

        audio: geminiResult.audio,
      });
    }

    /*
     --------------------------------
     GROK FALLBACK
     --------------------------------
    */

    console.log(
      "[TTS] Falling back to Grok"
    );

    const grokAudio =
      await tryGrokProvider(text);

    if (grokAudio) {
      const wavBlob = pcmToWav(
        new Uint8Array(grokAudio)
      );

      const arrayBuffer =
        await wavBlob.arrayBuffer();

      const base64Audio = Buffer.from(
        arrayBuffer
      ).toString("base64");

      return NextResponse.json({
        provider: "grok",
        audio: base64Audio,
      });
    }

    /*
     --------------------------------
     COMPLETE FAILURE
     --------------------------------
    */

    return NextResponse.json(
      {
        error:
          "All TTS providers failed",
      },
      {
        status: 500,
      }
    );
  } catch (error) {
    console.error(
      "[TTS ROUTE ERROR]",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to generate speech",
      },
      {
        status: 500,
      }
    );
  }
}