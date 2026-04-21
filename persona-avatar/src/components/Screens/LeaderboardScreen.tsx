import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import type { AvatarDoc } from "@/lib/firebase";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { PageBackground } from "@/components/PageBackground";

const MEDAL_COLORS = [
  { border: "#FFD700", glow: "#FFD70066", badge: "from-yellow-400 to-amber-500", label: "🥇" },
  { border: "#C0C0C0", glow: "#C0C0C066", badge: "from-slate-300 to-slate-400", label: "🥈" },
  { border: "#CD7F32", glow: "#CD7F3266", badge: "from-orange-400 to-amber-700", label: "🥉" },
];

const PODIUM_HEIGHTS = ["h-24", "h-36", "h-20"];

export function LeaderboardScreen() {
  const [avatars, setAvatars] = useState<AvatarDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(query(collection(db, "avatars"), orderBy("likes", "desc"), limit(10)))
      .then((snap) => {
        setAvatars(snap.docs.map((d) => ({ id: d.id, likes: 0, likedIPs: [], ...(d.data() as Omit<AvatarDoc, "id">) })));
      })
      .finally(() => setLoading(false));
  }, []);

  const top3 = avatars.slice(0, 3);
  const rest = avatars.slice(3);

  // Podium display order: 2nd · 1st · 3rd
  const podiumOrder = [
    { avatar: top3[1], rank: 1, medal: MEDAL_COLORS[1], size: 140, podiumIdx: 0 },
    { avatar: top3[0], rank: 0, medal: MEDAL_COLORS[0], size: 180, podiumIdx: 1 },
    { avatar: top3[2], rank: 2, medal: MEDAL_COLORS[2], size: 130, podiumIdx: 2 },
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
    <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center" dir="rtl">
      <PageBackground />

      {/* Header */}
      <div className="text-center mb-12 mt-6">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-1.5 text-white/70 text-sm font-medium mb-4">
          <span>✨</span> טוב לב מנצח
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
          האהובים ביותר
        </h1>
        <p className="text-white/50 mt-2 text-sm">האווטארים שגנבו את הלבבות</p>
      </div>

      {avatars.length === 0 && (
        <p className="text-white/60 text-lg">עדיין אין אווטארים. היה הראשון!</p>
      )}

      {avatars.length > 0 && (
        <>
          {/* Podium */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 mb-16 w-full max-w-2xl">
            {podiumOrder.map(({ avatar, rank, medal, size, podiumIdx }) => (
              <button
                key={avatar.id}
                onClick={() => navigate(`/avatar/${avatar.id}`)}
                className="flex flex-col items-center group focus:outline-none"
              >
                {/* Card */}
                <div
                  className="relative flex flex-col items-center rounded-2xl p-3 sm:p-4 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 cursor-pointer"
                  style={{
                    border: `2px solid ${medal.border}`,
                    boxShadow: `0 0 24px ${medal.glow}, 0 8px 32px rgba(0,0,0,0.4)`,
                    background: "rgba(255,255,255,0.08)",
                    minWidth: size + 24,
                  }}
                >
                  {/* Medal badge */}
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${medal.badge} flex items-center justify-center text-base shadow-lg border-2 border-white/30`}>
                    {medal.label}
                  </div>

                  <div className="mt-2">
                    <AvatarDisplay config={avatar.config} size={size} static />
                  </div>

                  <p className="font-bold text-white text-sm sm:text-base mt-2 truncate max-w-[120px]">{avatar.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-pink-400 text-xs">❤️</span>
                    <span className="text-white/80 text-xs font-semibold">{avatar.likes}</span>
                  </div>

                  {/* View profile hint */}
                  <span className="mt-2 text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
                    צפה בפרופיל ←
                  </span>
                </div>

                {/* Podium base */}
                <div
                  className={`w-full rounded-b-lg ${PODIUM_HEIGHTS[podiumIdx]} bg-gradient-to-b mt-0`}
                  style={{
                    background: `linear-gradient(to bottom, ${medal.border}55, ${medal.border}22)`,
                    borderLeft: `1px solid ${medal.border}44`,
                    borderRight: `1px solid ${medal.border}44`,
                    borderBottom: `1px solid ${medal.border}44`,
                    minWidth: size + 28,
                  }}
                >
                  <div className="flex items-center justify-center pt-2">
                    <span className="text-white/50 font-black text-2xl sm:text-3xl">#{rank + 1}</span>
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
                  className="group w-full flex items-center gap-4 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 rounded-xl px-4 py-3 transition-all duration-200 text-right cursor-pointer"
                >
                  <span className="text-white/30 font-bold text-sm w-6 shrink-0 text-center">#{idx + 4}</span>

                  <div className="shrink-0">
                    <AvatarDisplay config={avatar.config} size={52} static />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{avatar.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">❤️ {avatar.likes} לייקים</p>
                  </div>

                  <span className="text-white/30 group-hover:text-white/60 text-sm transition-colors shrink-0">
                    ←
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
