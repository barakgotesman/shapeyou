import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { Button } from "@/components/ui/button";
import { loadAvatar, likeAvatar } from "@/lib/firebase";
import type { AvatarDoc } from "@/lib/firebase";
import type { AvatarConfig } from "@/lib/avatar";
import { PageBackground } from "@/components/PageBackground";

async function fetchHashedIP(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json() as { ip: string };
    const encoded = new TextEncoder().encode(data.ip);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return null;
  }
}

export function SharedAvatarScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<AvatarDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [ip, setIp] = useState<string | null>(null);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    Promise.all([
      loadAvatar(id),
      fetchHashedIP(),
    ]).then(([doc, userIp]) => {
      if (!doc) setNotFound(true);
      else setAvatar(doc);
      setIp(userIp);
    }).catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const hasLiked = !!(ip && avatar?.likedIPs.includes(ip));

  const handleLike = async () => {
    if (!avatar || !id || !ip || hasLiked || liking) return;
    setLiking(true);
    // Optimistic update
    setAvatar(a => a ? { ...a, likes: a.likes + 1, likedIPs: [...a.likedIPs, ip] } : a);
    try {
      await likeAvatar(id, ip);
    } catch {
      // Revert on failure
      setAvatar(a => a ? { ...a, likes: a.likes - 1, likedIPs: a.likedIPs.filter(i => i !== ip) } : a);
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageBackground />
        <p className="text-brand-primary animate-pulse text-lg font-semibold">טוען...</p>
      </div>
    );
  }

  if (notFound || !avatar) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <PageBackground />
        <p className="text-2xl font-bold text-brand-dark">האווטאר לא נמצא</p>
        <Button onClick={() => navigate("/")}>חזור לדף הבית</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16">
      <PageBackground />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-0">

        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />

        <p className="text-xs font-medium uppercase tracking-widest text-brand-primary mt-2">
          shapeyou של מישהו
        </p>

        <div className="mt-4">
          <AvatarDisplay config={avatar.config as AvatarConfig} size={260} />
        </div>

        <h2 className="text-2xl font-bold text-brand-dark text-center mt-4">{avatar.name}</h2>
        <p className="text-sm text-gray-400 italic text-center mt-2">{avatar.description}</p>

        {/* Like button */}
        <button
          onClick={handleLike}
          disabled={hasLiked || liking}
          className="mt-5 flex items-center gap-2 px-5 py-2 rounded-full border transition-all"
          style={{
            borderColor: hasLiked ? "#FF6B9D" : "#EDE9FE",
            background: hasLiked ? "#FFF0F5" : "white",
            color: hasLiked ? "#FF6B9D" : "#9CA3AF",
            cursor: hasLiked ? "default" : "pointer",
          }}
        >
          <span style={{ fontSize: 18 }}>{hasLiked ? "❤️" : "🤍"}</span>
          <span className="text-sm font-semibold">{avatar.likes}</span>
        </button>

        <div className="w-full h-px bg-brand-muted my-6" />

        <Button className="w-full rounded-xl font-semibold" onClick={() => navigate("/")}>
          צור את שלך ←
        </Button>
      </div>
    </div>
  );
}
