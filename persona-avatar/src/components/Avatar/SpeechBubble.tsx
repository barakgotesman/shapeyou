import { useEffect, useState } from "react";

type Props = { text: string };

// Rendered outside the SVG as a regular DOM element above the avatar card
export const SpeechBubble = ({ text }: Props) => {
  const [displayed, setDisplayed] = useState("");

  // Restart typewriter whenever text changes
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 40); // 40ms per character feels natural
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative flex justify-center">
      {/* Bubble */}
      <div className="bg-white rounded-2xl shadow-md px-4 py-2 text-sm font-medium text-gray-700 max-w-xs text-center min-h-[36px]">
        {displayed}
        {/* Blinking cursor while typing */}
        {displayed.length < text.length && (
          <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 align-middle animate-pulse" />
        )}
      </div>
      {/* Tail pointing down toward the avatar */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0
        border-l-8 border-r-8 border-t-8
        border-l-transparent border-r-transparent border-t-white
        drop-shadow-sm" />
    </div>
  );
};
