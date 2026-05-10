"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Volume2,
  Square,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useAudioContext } from "@/context/AudioContext";

import {
  base64ToWavBlob,
  browserSpeechFallback,
} from "@/lib/generateSpeech";

interface SpeakButtonProps {
  text: string;
  voiceName?: string;
}

export function SpeakButton({
  text,
  voiceName = "Algenib",
}: SpeakButtonProps) {
  const {
    isSpeaking: globalSpeaking,
    setIsSpeaking: setGlobalSpeaking,
    audioRef,
  } = useAudioContext();

  const [loading, setLoading] =
    useState(false);

  const [speaking, setSpeaking] =
    useState(false);

  const objectUrlRef = useRef<
    string | null
  >(null);

  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();

      audioRef.current.currentTime = 0;

      audioRef.current.src = "";

      audioRef.current = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );

      objectUrlRef.current = null;
    }
  }, [audioRef]);

  const stopAudio = useCallback(() => {
    speechSynthesis.cancel();

    cleanupAudio();

    setSpeaking(false);

    setLoading(false);

    setGlobalSpeaking(false);
  }, [
    cleanupAudio,
    setGlobalSpeaking,
  ]);

  const handleSpeak = async () => {
    if (globalSpeaking && !speaking) {
      alert(
        "Please Stop the previous active Listening Output"
      );

      return;
    }

    try {
      if (speaking) {
        stopAudio();

        return;
      }

      setLoading(true);

      /*
       --------------------------------
       BACKEND TTS REQUEST
       --------------------------------
      */

      const response = await fetch(
        "/api/tts",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            text,
            voiceName,
          }),
        }
      );

      /*
       --------------------------------
       FALLBACK TO BROWSER SPEECH
       --------------------------------
      */

      if (!response.ok) {
        console.warn(
          "Backend TTS failed. Falling back to browser speech."
        );

        await browserSpeechFallback(
          text
        );

        setSpeaking(true);

        setGlobalSpeaking(true);

        setLoading(false);

        return;
      }

      const data =
        await response.json();

      /*
       --------------------------------
       BROWSER SPEECH PROVIDER
       --------------------------------
      */

      if (
        data.provider === "browser"
      ) {
        await browserSpeechFallback(
          text
        );

        setSpeaking(true);

        setGlobalSpeaking(true);

        setLoading(false);

        return;
      }

      /*
       --------------------------------
       AUDIO PLAYBACK
       --------------------------------
      */

      const wavBlob =
        base64ToWavBlob(
          data.audio
        );

      const audioUrl =
        URL.createObjectURL(wavBlob);

      objectUrlRef.current =
        audioUrl;

      const audio = new Audio(
        audioUrl
      );

      audioRef.current = audio;

      audio.onended = () => {
        stopAudio();
      };

      audio.onerror = () => {
        stopAudio();
      };

      setSpeaking(true);

      setGlobalSpeaking(true);

      setLoading(false);

      await audio.play();
    } catch (error) {
      console.error(
        "TTS Generation Error:",
        error
      );

      try {
        await browserSpeechFallback(
          text
        );

        setSpeaking(true);

        setGlobalSpeaking(true);

        setLoading(false);
      } catch {
        alert(
          "All speech providers failed."
        );

        stopAudio();
      }
    }
  };

  useEffect(() => {
    if (
      globalSpeaking &&
      !loading
    ) {
      setSpeaking(true);
    }

    if (!globalSpeaking) {
      setSpeaking(false);
    }
  }, [globalSpeaking, loading]);

  useEffect(() => {
    return () => {
      // preserve playback across navigation
    };
  }, []);

  return (
    <div className="flex flex-col items-start gap-2">
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
          disabled:cursor-not-allowed
          disabled:opacity-60
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

      {globalSpeaking &&
        !speaking &&
        !loading && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />

            Please Stop the previous active Listening Output
          </p>
        )}
    </div>
  );
}

export default SpeakButton;