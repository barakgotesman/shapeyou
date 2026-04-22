import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import type { AvatarDoc } from "@/lib/firebase";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { PageBackground } from "@/components/PageBackground";

const MEDAL = [
  { border: "#FFD700", glow: "#FFD70066", badge: "from-yellow-400 to-amber-500", label: "🥇" },
  { border: "#C0C0C0", glow: "#C0C0C066", badge: "from-slate-300 to-slate-400", label: "🥈" },
  { border: "#CD7F32", glow: "#CD7F3266", badge: "from-orange-400 to-amber-700", label: "🥉" },
];

// Podium base heights: 2nd · 1st · 3rd
const PODIUM_H = ["h-20 sm:h-24", "h-28 sm:h-36", "h-16 sm:h-20"];

// Avatar sizes per podium slot via Tailwind classes: 2nd · 1st · 3rd
const AVATAR_CLASS = [
  "w-20 h-20 sm:w-36 sm:h-36",
  "w-24 h-24 sm:w-44 sm:h-44",
  "w-16 h-16 sm:w-32 sm:h-32",
];

export function LeaderboardScreen() {
  const [avatars, setAvatars] = useState<AvatarDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(query(collection(db, "avatars"), orderBy("likes", "desc"), limit(10)))
      .then((snap) => {
        setAvatars(snap.docs.map((d) => ({
          likes: 0, likedIPs: [], xp: 0, chosenAccessory: null,
          ...(d.data() as Omit<AvatarDoc, "id" | "likes" | "likedIPs" | "xp" | "chosenAccessory">),
          id: d.id,
        })));
      })
      .finally(() => setLoading(false));
  }, []);

  const top3 = avatars.slice(0, 3);
  const rest = avatars.slice(3);

  // Display order: 2nd · 1st · 3rd
  const podiumOrder = [
    { avatar: top3[1], rank: 1, medal: MEDAL[1], slotIdx: 0 },
    { avatar: top3[0], rank: 0, medal: MEDAL[0], slotIdx: 1 },
    { avatar: top3[2], rank: 2, medal: MEDAL[2], slotIdx: 2 },
  ].filter((p) => p.avatar);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageBackground />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
          <p className="text-white/60 text-lg">טוען לוח מובילים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-3 sm:px-4 flex flex-col items-center" dir="rtl">
      <PageBackground />

      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 mt-4 sm:mt-6">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-5 py-1.5 text-white/70 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
          <span>✨</span> טוב לב מנצח
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
          האהובים ביותר
        </h1>
        <p className="text-white/50 mt-2 text-xs sm:text-sm">האווטארים שגנבו את הלבבות</p>
      </div>

      {avatars.length === 0 && (
        <p className="text-white/60 text-lg">עדיין אין אווטארים. היה הראשון!</p>
      )}

      {avatars.length > 0 && (
        <>
          {/* Podium */}
          <div className="flex items-end justify-center gap-2 sm:gap-6 mb-10 sm:mb-16 w-full max-w-2xl">
            {podiumOrder.map(({ avatar, rank, medal, slotIdx }) => (
              <button
                key={avatar.id}
                onClick={() => navigate(`/avatar/${avatar.id}`)}
                className="relative flex flex-col items-center group focus:outline-none flex-1 min-w-0 pt-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                {/* Medal badge — sits above the card, not clipped */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${medal.badge} flex items-center justify-center text-sm shadow-lg border-2 border-white/30 z-10`}>
                  {medal.label}
                </div>

                {/* Unified card — single border, overflow-hidden merges card + podium base */}
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{
                    border: `2px solid ${medal.border}`,
                    boxShadow: `0 0 24px ${medal.glow}, 0 8px 32px rgba(0,0,0,0.4)`,
                  }}
                >
                  {/* Card content */}
                  <div className="flex flex-col items-center p-2 sm:p-4" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="mt-2">
                      <AvatarDisplay
                        config={avatar.config}
                        chosenAccessory={avatar.chosenAccessory}
                        className={AVATAR_CLASS[slotIdx]}
                        static
                      />
                    </div>
                    <p className="font-bold text-white text-xs sm:text-base mt-1 sm:mt-2 truncate w-full text-center px-1">
                      {avatar.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                      <span className="text-xs">❤️</span>
                      <span className="text-white/80 text-xs font-semibold">{avatar.likes}</span>
                    </div>
                    <span className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
                      צפה בפרופיל ←
                    </span>
                  </div>

                  {/* Podium base — no separate border, flows naturally from card */}
                  <div
                    className={`w-full flex items-center justify-center ${PODIUM_H[slotIdx]}`}
                    style={{ background: `linear-gradient(to bottom, ${medal.border}44, ${medal.border}18)` }}
                  >
                    <span className="text-white/50 font-black text-xl sm:text-3xl">#{rank + 1}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Ranks 4–10 */}
          {rest.length > 0 && (
            <div className="w-full max-w-xl flex flex-col gap-2">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1 px-1">מקומות 4–10</p>
              {rest.map((avatar, idx) => (
                <button
                  key={avatar.id}
                  onClick={() => navigate(`/avatar/${avatar.id}`)}
                  className="group w-full flex items-center gap-3 sm:gap-4 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-white/30 font-bold text-sm w-6 shrink-0 text-center">#{idx + 4}</span>
                  <div className="shrink-0">
                    <AvatarDisplay
                      config={avatar.config}
                      chosenAccessory={avatar.chosenAccessory}
                      className="w-10 h-10 sm:w-14 sm:h-14"
                      static
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <p className="font-semibold text-white text-sm truncate">{avatar.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">❤️ {avatar.likes} לייקים</p>
                  </div>
                  <span className="text-white/30 group-hover:text-white/60 text-sm transition-colors shrink-0">←</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
