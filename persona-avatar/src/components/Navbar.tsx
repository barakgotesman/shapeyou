export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-brand-muted flex items-center justify-between px-6">
      <a href="/" className="flex items-center gap-2.5 select-none">
        <ShapeYouLogo />
        <span className="text-lg font-bold text-brand-dark tracking-tight">
          Shape<span className="text-brand-primary">You</span>
        </span>
      </a>
    </header>
  );
}

function ShapeYouLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6C63FF" />
        </linearGradient>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Head shape */}
      <ellipse cx="18" cy="21" rx="10" ry="11" fill="url(#headGrad)" />

      {/* Forehead highlight */}
      <ellipse cx="15" cy="15" rx="5" ry="3.5" fill="#ffffff22" />

      {/* Eyes */}
      <circle cx="14.5" cy="20" r="1.8" fill="white" opacity="0.95" />
      <circle cx="21.5" cy="20" r="1.8" fill="white" opacity="0.95" />
      <circle cx="14.5" cy="20" r="0.9" fill="#1F1B4E" />
      <circle cx="21.5" cy="20" r="0.9" fill="#1F1B4E" />
      <circle cx="15" cy="19.5" r="0.4" fill="white" opacity="0.8" />
      <circle cx="22" cy="19.5" r="0.4" fill="white" opacity="0.8" />

      {/* Smile */}
      <path d="M14.5 25 Q18 28 21.5 25" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

      {/* Blush */}
      <ellipse cx="12.5" cy="24" rx="2.5" ry="1.5" fill="#FF6B6B" opacity="0.25" />
      <ellipse cx="23.5" cy="24" rx="2.5" ry="1.5" fill="#FF6B6B" opacity="0.25" />

      {/* Golden star spark top-right */}
      <g transform="translate(24, 5)">
        <path d="M0 -5 L1.1 -1.6 L4.8 -1.6 L1.9 0.6 L3 4 L0 1.8 L-3 4 L-1.9 0.6 L-4.8 -1.6 L-1.1 -1.6 Z"
          fill="url(#sparkGrad)" />
      </g>

      {/* Small accent dot top-left */}
      <circle cx="8" cy="8" r="2" fill="#A78BFA" opacity="0.5" />
      <circle cx="8" cy="8" r="1" fill="#6C63FF" opacity="0.7" />
    </svg>
  );
}
