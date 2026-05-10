import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export const GEMINI_MODELS = [
  "gemini-2.5-flash-preview-tts",
  "gemini-2.5-pro-preview-tts",
];

export function pcmToWav(
  pcmData: Uint8Array,
  sampleRate = 24000,
  channels = 1,
  bitsPerSample = 16
) {
  const headerSize = 44;

  const wavBuffer = new ArrayBuffer(
    headerSize + pcmData.length
  );

  const view = new DataView(wavBuffer);

  const writeString = (
    view: DataView,
    offset: number,
    str: string
  ) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(
        offset + i,
        str.charCodeAt(i)
      );
    }
  };

  /*
   --------------------------------
   RIFF HEADER
   --------------------------------
  */

  writeString(view, 0, "RIFF");

  view.setUint32(
    4,
    36 + pcmData.length,
    true
  );

  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);

  view.setUint16(
    22,
    channels,
    true
  );

  view.setUint32(
    24,
    sampleRate,
    true
  );

  const byteRate =
    (sampleRate *
      channels *
      bitsPerSample) /
    8;

  view.setUint32(
    28,
    byteRate,
    true
  );

  const blockAlign =
    (channels * bitsPerSample) / 8;

  view.setUint16(
    32,
    blockAlign,
    true
  );

  view.setUint16(
    34,
    bitsPerSample,
    true
  );

  /*
   --------------------------------
   DATA CHUNK
   --------------------------------
  */

  writeString(view, 36, "data");

  view.setUint32(
    40,
    pcmData.length,
    true
  );

  new Uint8Array(
    wavBuffer,
    44
  ).set(pcmData);

  return new Blob([wavBuffer], {
    type: "audio/wav",
  });
}

export async function generateGeminiSpeech(
  text: string,
  voiceName: string,
  model: string
) {
  const response =
    await ai.models.generateContent({
      model,

      contents: [
        {
          role: "user",

          parts: [
            {
              text: `Speak naturally and clearly in an educational tone:\n\n${text}`,
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

  const base64Audio =
    response.candidates?.[0]?.content
      ?.parts?.[0]?.inlineData?.data;

  if (!base64Audio) {
    throw new Error(
      `No audio returned from ${model}`
    );
  }

  return base64Audio;
}

export function base64ToUint8Array(
  base64: string
) {
  const binaryString = atob(base64);

  const bytes = new Uint8Array(
    binaryString.length
  );

  for (
    let i = 0;
    i < binaryString.length;
    i++
  ) {
    bytes[i] =
      binaryString.charCodeAt(i);
  }

  return bytes;
}

export function base64ToWavBlob(
  base64: string
) {
  const pcmBytes =
    base64ToUint8Array(base64);

  return pcmToWav(pcmBytes);
}

export async function browserSpeechFallback(
  text: string
) {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    throw new Error(
      "Browser speech synthesis unavailable"
    );
  }

  return new Promise<void>(
    (resolve, reject) => {
      try {
        const utterance =
          new SpeechSynthesisUtterance(
            text
          );

        utterance.rate = 1;

        utterance.pitch = 1;

        utterance.onstart = () => {
          resolve();
        };

        utterance.onerror = (e) => {
          reject(e);
        };

        speechSynthesis.speak(
          utterance
        );
      } catch (error) {
        reject(error);
      }
    }
  );
}