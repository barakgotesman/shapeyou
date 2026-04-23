import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { Button } from "@/components/ui/button";
import { loadAvatar, likeAvatar, awardLikerCoins } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import type { AvatarDoc } from "@/lib/firebase";
import type { AvatarConfig } from "@/lib/avatar";
import { PageBackground } from "@/components/PageBackground";
import { useAuth } from "@/context/AuthContext";

function setMeta(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

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
  const { user, refreshUserDoc } = useAuth();
  const { toast } = useToast();
  const [avatar, setAvatar] = useState<AvatarDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [ip, setIp] = useState<string | null>(null);
  const [liking, setLiking] = useState(false);
  const [coinFlash, setCoinFlash] = useState(0);
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "הקישור הועתק! 🔗", description: "שתף אותו עם מי שתרצה" });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`קלוט את השייפיו שלי!\n${window.location.href}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    Promise.all([loadAvatar(id), fetchHashedIP()])
      .then(([doc, userIp]) => {
        if (!doc) { setNotFound(true); return; }
        setAvatar(doc);
        setIp(userIp);

        // Inject per-avatar OG tags so WhatsApp/social crawlers show the right preview
        const url = window.location.href;
        const title = `השייפיו של ${doc.ownerFirstName ?? "מישהו"} — ShapeYou`;
        const desc = doc.description ?? "בוא תראה את הדמות שנוצרה בשבילי!";
        setMeta("og:title", title);
        setMeta("og:description", desc);
        setMeta("og:url", url);
        setMeta("twitter:title", title);
        setMeta("twitter:description", desc);
        document.title = title;
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const hasLiked = !!(ip && avatar?.likedIPs.includes(ip));

  const handleLike = async () => {
    if (!avatar || !id || !ip || hasLiked || liking) return;
    setLiking(true);
    setAvatar(a => a ? { ...a, likes: a.likes + 1, likedIPs: [...a.likedIPs, ip] } : a);
    try {
      await likeAvatar(id, ip);
      const isLikingOther = user && avatar.ownerUid && user.uid !== avatar.ownerUid;
      if (isLikingOther) {
        const earned = await awardLikerCoins(user.uid);
        await refreshUserDoc();
        if (earned > 0) {
          setCoinFlash(earned);
          setTimeout(() => setCoinFlash(0), 2000);
        }
      }
    } catch {
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

        {(() => {
          const isOwner = !!(user && avatar.ownerUid && user.uid === avatar.ownerUid);
          const ownerFirstName = isOwner
            ? (user!.displayName?.split(" ")[0] ?? "אתה")
            : avatar.ownerFirstName;
          return (
            <>
              <p className="text-xs font-medium uppercase tracking-widest text-brand-primary mt-2">
                {ownerFirstName ? `השייפיו של ${ownerFirstName}` : "שייפיו של מישהו"}
              </p>
              {isOwner && !avatar.ownerFirstName && (
                <p className="text-[10px] text-gray-300 mt-0.5" dir="rtl">
                  שמך לא מוצג לציבור לפי הגדרותיך
                </p>
              )}
            </>
          );
        })()}

        <div className="mt-4">
          <AvatarDisplay config={avatar.config as AvatarConfig} chosenAccessory={avatar.chosenAccessory} size={260} />
        </div>

        <h2 className="text-2xl font-bold text-brand-dark text-center mt-4">{avatar.name}</h2>
        <p className="text-sm text-gray-400 italic text-center mt-2">{avatar.description}</p>

        {/* Like button */}
        <div className="mt-5 flex flex-col items-center gap-1">
          <button
            onClick={handleLike}
            disabled={hasLiked || liking}
            className="flex items-center gap-2 px-5 py-2 rounded-full border transition-all"
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
          <span
            className="text-xs font-semibold text-amber-500 transition-all duration-300"
            style={{ opacity: coinFlash ? 1 : 0, transform: coinFlash ? "translateY(-4px)" : "translateY(0)" }}
          >
            +{coinFlash} 🪙
          </span>
        </div>

        <div className="w-full h-px bg-brand-muted my-6" />

        <div className="flex gap-2 w-full">
          <button
            onClick={handleCopyUrl}
            className="flex-1 flex items-center justify-center gap-1.5 border border-brand-muted rounded-xl py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors"
          >
            🔗 העתק קישור
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 border border-green-200 rounded-xl py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50 transition-colors"
          >
            <WhatsAppIcon /> שתף
          </button>
        </div>

        <Button className="w-full rounded-xl font-semibold" onClick={() => navigate("/")}>
          צור את שלך ←
        </Button>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.848L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.523-5.186-1.432l-.371-.22-3.862.919.976-3.768-.242-.387A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}
