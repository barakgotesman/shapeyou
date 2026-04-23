import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, signIn, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [navigate]);

  const handleMyAvatars = async () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    if (user) {
      navigate("/my-avatars");
    } else {
      try {
        await signIn();
        navigate("/my-avatars");
      } catch {
        // user closed popup
      }
    }
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    await signOut();
  };

  const Avatar = () => user?.photoURL ? (
    <img
      src={user.photoURL}
      alt={user.displayName ?? "פרופיל"}
      className="w-8 h-8 rounded-full border-2 border-brand-primary object-cover"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold select-none">
      {(user?.displayName ?? user?.email ?? "?")[0].toUpperCase()}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-brand-muted flex items-center justify-between px-4 sm:px-6">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 select-none shrink-0">
        <ShapeYouLogo />
        <span className="text-lg font-bold text-brand-dark tracking-tight">
          Shape<span className="text-brand-primary">You</span>
        </span>
      </Link>

      {/* ── Desktop nav (md+) ── */}
      <div className="hidden md:flex items-center gap-5" dir="rtl">
        <Link
          to="/leaderboard"
          className="text-sm font-semibold text-brand-primary hover:underline underline-offset-4 transition-colors"
        >
          האהובים ביותר
        </Link>

        {!loading && (
          user ? (
            <>
              {/* Profile photo → dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(o => !o)}
                  className="flex items-center gap-2 rounded-full focus:outline-none"
                  aria-label="תפריט משתמש"
                >
                  <Avatar />
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
                    dir="rtl"
                  >
                    {user.displayName && (
                      <p className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100 truncate">
                        {user.displayName}
                      </p>
                    )}
                    <button
                      onClick={handleMyAvatars}
                      className="w-full text-right px-4 py-2.5 text-sm text-brand-dark hover:bg-gray-50 transition-colors"
                    >
                      השייפים שלי
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/settings"); }}
                      className="w-full text-right px-4 py-2.5 text-sm text-brand-dark hover:bg-gray-50 transition-colors"
                    >
                      הגדרות
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-right px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      התנתק
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={signIn}
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-primary border border-brand-primary rounded-full px-3 py-1 hover:bg-brand-primary hover:text-white transition-colors"
            >
              <GoogleIcon />
              התחבר
            </button>
          )
        )}
      </div>

      {/* ── Mobile right side (< md) ── */}
      <div className="flex md:hidden items-center gap-3">
        {/* Show user photo on mobile even before hamburger */}
        {!loading && user && (
          <button onClick={() => setMenuOpen(o => !o)} className="rounded-full">
            <Avatar />
          </button>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="פתח תפריט"
          className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        >
          <span className={`block h-0.5 w-6 bg-brand-dark rounded transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-dark rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-dark rounded transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 bg-white border-b border-brand-muted shadow-lg flex flex-col py-2 md:hidden z-50"
          dir="rtl"
        >
          {!loading && user?.displayName && (
            <p className="px-5 py-2 text-xs text-gray-400 border-b border-gray-100">{user.displayName}</p>
          )}
          <Link
            to="/leaderboard"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-gray-50 transition-colors"
          >
            האהובים ביותר
          </Link>
          {!loading && (
            user ? (
              <>
                <button
                  onClick={handleMyAvatars}
                  className="text-right px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-gray-50 transition-colors"
                >
                  השייפים שלי
                </button>
                <button
                  onClick={() => { setMenuOpen(false); navigate("/settings"); }}
                  className="text-right px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-gray-50 transition-colors"
                >
                  הגדרות
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-right px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  התנתק
                </button>
              </>
            ) : (
              <button
                onClick={async () => { setMenuOpen(false); await signIn(); }}
                className="text-right px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <GoogleIcon />
                התחבר עם Google
              </button>
            )
          )}
        </div>
      )}
    </header>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
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
      <ellipse cx="18" cy="21" rx="10" ry="11" fill="url(#headGrad)" />
      <ellipse cx="15" cy="15" rx="5" ry="3.5" fill="#ffffff22" />
      <circle cx="14.5" cy="20" r="1.8" fill="white" opacity="0.95" />
      <circle cx="21.5" cy="20" r="1.8" fill="white" opacity="0.95" />
      <circle cx="14.5" cy="20" r="0.9" fill="#1F1B4E" />
      <circle cx="21.5" cy="20" r="0.9" fill="#1F1B4E" />
      <circle cx="15" cy="19.5" r="0.4" fill="white" opacity="0.8" />
      <circle cx="22" cy="19.5" r="0.4" fill="white" opacity="0.8" />
      <path d="M14.5 25 Q18 28 21.5 25" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      <ellipse cx="12.5" cy="24" rx="2.5" ry="1.5" fill="#FF6B6B" opacity="0.25" />
      <ellipse cx="23.5" cy="24" rx="2.5" ry="1.5" fill="#FF6B6B" opacity="0.25" />
      <g transform="translate(24, 5)">
        <path d="M0 -5 L1.1 -1.6 L4.8 -1.6 L1.9 0.6 L3 4 L0 1.8 L-3 4 L-1.9 0.6 L-4.8 -1.6 L-1.1 -1.6 Z"
          fill="url(#sparkGrad)" />
      </g>
      <circle cx="8" cy="8" r="2" fill="#A78BFA" opacity="0.5" />
      <circle cx="8" cy="8" r="1" fill="#6C63FF" opacity="0.7" />
    </svg>
  );
}
