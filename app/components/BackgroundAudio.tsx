"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const attemptPlay = async () => {
      // If already playing, don't try again
      if (!audio.paused) {
        setIsPlaying(true);
        removeInteractionListeners();
        return;
      }
      
      try {
        await audio.play();
        setIsPlaying(true);
        // If successful, remove listeners
        removeInteractionListeners();
      } catch (error) {
        // Autoplay prevented, waiting for interaction
        setIsPlaying(false);
      }
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("click", attemptPlay);
      document.removeEventListener("keydown", attemptPlay);
      document.removeEventListener("touchstart", attemptPlay);
      document.removeEventListener("scroll", attemptPlay);
    };

    // Try immediately
    attemptPlay();

    // Add listeners for retry
    document.addEventListener("click", attemptPlay);
    document.addEventListener("keydown", attemptPlay);
    document.addEventListener("touchstart", attemptPlay);
    document.addEventListener("scroll", attemptPlay);

    return () => {
      removeInteractionListeners();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((e) => console.error("Play failed", e));
      setIsPlaying(true);
    }
  };

  return (
    <>
      <button
        onClick={togglePlay}
        className="fixed top-4 right-4 z-[9999] p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-all border border-white/20 shadow-lg group"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? (
          // Music Note Icon (Playing)
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-white/90 group-hover:text-white"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          // Music Off Icon (Muted/Paused)
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-white/50 group-hover:text-white/80"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src="/frames/audio.mp3"
        loop
        className="hidden"
      />
    </>
  );
}
