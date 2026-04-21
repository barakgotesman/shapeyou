// Shared decorative background for all screens (Traits, Result, Shared, Name).
// Uses the full brand palette — dark navy + violet + lavender + gold accents.
// Fixed-positioned so it doesn't scroll with content.

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Deep gradient base — uses all brand dark/primary/secondary colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#2d2870] to-brand-primary" />

      {/* Gold highlight orb — top right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-highlight opacity-10 blur-3xl" />
      {/* Lavender orb — bottom left */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-secondary opacity-20 blur-3xl" />
      {/* Violet mid orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-primary opacity-15 blur-3xl" />

      {/* SVG pattern layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Dot grid — white dots on dark background */}
          <pattern id="bg-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" opacity="0.07" />
          </pattern>

          {/* Cross/plus pattern for depth */}
          <pattern id="bg-cross" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <line x1="32" y1="28" x2="32" y2="36" stroke="white" strokeWidth="1" opacity="0.05" />
            <line x1="28" y1="32" x2="36" y2="32" stroke="white" strokeWidth="1" opacity="0.05" />
          </pattern>
        </defs>

        {/* Dot grid fills entire background */}
        <rect width="100%" height="100%" fill="url(#bg-dots)" />
        {/* Cross pattern on top */}
        <rect width="100%" height="100%" fill="url(#bg-cross)" />

        {/* Top-left arc */}
        <path d="M-40 180 Q-40 -40 180 -40"
          fill="none" stroke="white" strokeWidth="1.5" opacity="0.06" strokeLinecap="round" />
        <path d="M-40 300 Q-40 -40 300 -40"
          fill="none" stroke="#A78BFA" strokeWidth="1" opacity="0.08" strokeLinecap="round" />

        {/* Bottom-right arc */}
        <path d="M100vw,calc(100vh - 180px) Q100vw,100vh calc(100vw - 180px),100vh"
          fill="none" stroke="#6C63FF" strokeWidth="1.5" opacity="0.10" strokeLinecap="round" />

        {/* Scattered gold diamonds */}
        <polygon points="90%,4% 91.5%,7% 90%,10% 88.5%,7%" fill="#FCD34D" opacity="0.30" />
        <polygon points="5%,20% 6.5%,23% 5%,26% 3.5%,23%" fill="#FCD34D" opacity="0.20" />
        <polygon points="95%,60% 96.5%,63% 95%,66% 93.5%,63%" fill="#A78BFA" opacity="0.25" />
        <polygon points="3%,75% 4.5%,78% 3%,81% 1.5%,78%" fill="#6C63FF" opacity="0.30" />

        {/* Small accent circles */}
        <circle cx="8%" cy="40%" r="4" fill="#FCD34D" opacity="0.20" />
        <circle cx="92%" cy="30%" r="6" fill="#A78BFA" opacity="0.20" />
        <circle cx="50%" cy="95%" r="5" fill="#6C63FF" opacity="0.25" />
      </svg>

      {/* Top rainbow strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />
    </div>
  );
}
