"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, Square, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

interface SpeakButtonProps {
  text: string;
  voiceName?: string;
}

export function SpeakButton({
  text,
  voiceName = "Algenib",
}: SpeakButtonProps) {
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const stopAudio = useCallback(() => {
    cleanupAudio();
    setSpeaking(false);
    setLoading(false);
  }, []);

  const pcmToWav = (
    pcmData: Uint8Array,
    sampleRate = 24000,
    channels = 1,
    bitsPerSample = 16
  ) => {
    const headerSize = 44;
    const wavBuffer = new ArrayBuffer(headerSize + pcmData.length);

    const view = new DataView(wavBuffer);

    const writeString = (
      view: DataView,
      offset: number,
      str: string
    ) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + pcmData.length, true);
    writeString(view, 8, "WAVE");

    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);

    const byteRate =
      (sampleRate * channels * bitsPerSample) / 8;

    view.setUint32(28, byteRate, true);

    const blockAlign =
      (channels * bitsPerSample) / 8;

    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    writeString(view, 36, "data");
    view.setUint32(40, pcmData.length, true);

    new Uint8Array(wavBuffer, 44).set(pcmData);

    return new Blob([wavBuffer], {
      type: "audio/wav",
    });
  };

  const handleSpeak = async () => {
    try {
      if (speaking) {
        stopAudio();
        return;
      }

      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",

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
        response.candidates?.[0]?.content?.parts?.[0]
          ?.inlineData?.data;

      if (!base64Audio) {
        throw new Error("No audio returned from Gemini.");
      }

      const binaryString = atob(base64Audio);
      const audioBytes = new Uint8Array(
        binaryString.length
      );

      for (let i = 0; i < binaryString.length; i++) {
        audioBytes[i] = binaryString.charCodeAt(i);
      }

      const wavBlob = pcmToWav(audioBytes);
      const audioUrl = URL.createObjectURL(wavBlob);

      objectUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => {
        stopAudio();
      };
      audio.onerror = () => {
        stopAudio();
      };
      setSpeaking(true);
      setLoading(false);
      await audio.play();
    } catch (error) {
      console.error("Gemini TTS Error:", error);
      stopAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);


  return (
    <button
      type="button"
      onClick={handleSpeak}
      disabled={loading}
      className="
        inline-flex items-center gap-2
        rounded-xl border border-[#c48232]
        bg-white px-4 py-2
        text-sm font-medium text-[#b87333]
        shadow-sm transition-all
        hover:bg-[#fdf3e3]
        hover:border-[#edbd79]
        disabled:cursor-not-allowed disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : speaking ? (
        <Square className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}

      {loading
        ? "Generating..."
        : speaking
        ? "Stop"
        : "Listen"}
    </button>
  );
}

export default SpeakButton;