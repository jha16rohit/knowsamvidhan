"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  MutableRefObject,
} from "react";

interface AudioContextType {
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;

  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <AudioContext.Provider
      value={{
        isSpeaking,
        setIsSpeaking,
        audioRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);

  if (context === undefined) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }

  return context;
}
