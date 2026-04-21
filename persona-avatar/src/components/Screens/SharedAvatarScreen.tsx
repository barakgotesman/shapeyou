// SharedAvatarScreen — shown when someone opens a share link (/avatar/:id).
// Loads the avatar from Firestore by the doc ID in the URL.
// Does NOT read from AvatarContext — the viewer may never have used the app.

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { Button } from "@/components/ui/button";
import { loadAvatar } from "@/lib/firebase";
import type { AvatarDoc } from "@/lib/firebase";
import type { AvatarConfig } from "@/lib/avatar";
import { PageBackground } from "@/components/PageBackground";

export function SharedAvatarScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<AvatarDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    loadAvatar(id)
      .then(doc => {
        if (!doc) setNotFound(true);
        else setAvatar(doc);
      })
      .catch(() => setNotFound(true)) // network error or Firestore rules denied
      .finally(() => setLoading(false));
  }, [id]);

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
        <Button onClick={() => navigate("/")}>

          חזור לדף הבית
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16">
      <PageBackground />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-0">

        {/* Rainbow accent bar — consistent with all other cards */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />

        {/* Eyebrow label signals this is someone else's avatar */}
        <p className="text-xs font-medium uppercase tracking-widest text-brand-primary mt-2">
          shapeyou של מישהו
        </p>

        {/* Use stored config directly — avoids any re-derive drift if avatar.ts logic changes */}
        <div className="mt-4">
          <AvatarDisplay config={avatar.config as AvatarConfig} size={260} />
        </div>

        <h2 className="text-2xl font-bold text-brand-dark text-center mt-4">{avatar.name}</h2>
        <p className="text-sm text-gray-400 italic text-center mt-2">{avatar.description}</p>

        <div className="w-full h-px bg-brand-muted my-6" />

        {/* Primary CTA — drives new user acquisition from share links */}
        <Button
          className="w-full rounded-xl font-semibold"
          onClick={() => navigate("/")}
        >
          צור את שלך ←
        </Button>
      </div>
    </div>
  );
}
