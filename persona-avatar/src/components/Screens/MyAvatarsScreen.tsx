// "השייפים שלי" — shows all avatars created by the signed-in user.
// Redirects to home if the user is not signed in.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { loadMyAvatars } from "@/lib/firebase";
import type { AvatarDoc } from "@/lib/firebase";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { PageBackground } from "@/components/PageBackground";

export function MyAvatarsScreen() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<AvatarDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Wait for Firebase Auth to resolve before deciding to redirect
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
    loadMyAvatars(user.uid)
      .then(setAvatars)
      .finally(() => setLoading(false));
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageBackground />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
          <p className="text-white/60 text-lg">טוען את השייפים שלך...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center" dir="rtl">
      <PageBackground />

      {/* Header with user's photo and name */}
      <div className="text-center mb-10 mt-4">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName ?? ""}
            className="w-16 h-16 rounded-full border-4 border-brand-primary mx-auto mb-3 object-cover"
          />
        )}
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          השייפים שלי
        </h1>
        {user?.displayName && (
          <p className="text-white/50 text-sm mt-1">שלום, {user.displayName} 👋</p>
        )}
      </div>

      {/* Empty state */}
      {avatars.length === 0 && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-white/50 text-lg">עדיין אין לך אווטארים.</p>
          <button
            onClick={() => navigate("/create")}
            className="bg-brand-primary text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            צור את הראשון שלך ✦
          </button>
        </div>
      )}

      {/* Avatar grid */}
      {avatars.length > 0 && (
        <>
          <p className="text-white/40 text-sm mb-6">{avatars.length} אווטארים</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className="group flex flex-col items-center bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 rounded-2xl p-4 transition-all duration-200"
              >
                {/* Avatar preview — static for performance in grid */}
                <AvatarDisplay config={avatar.config} size={100} static />

                <p className="font-semibold text-white text-sm mt-2 truncate w-full text-center">
                  {avatar.name}
                </p>
                <p className="text-white/40 text-xs mt-0.5">❤️ {avatar.likes}</p>

                {/* Action buttons */}
                <div className="flex gap-2 mt-3 w-full">
                  <button
                    onClick={() => navigate(`/avatar/${avatar.id}`)}
                    className="flex-1 text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-lg py-1.5 transition-colors"
                  >
                    צפה
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${avatar.id}`)}
                    className="flex-1 text-xs font-semibold text-brand-primary border border-brand-primary/40 hover:bg-brand-primary hover:text-white rounded-lg py-1.5 transition-colors"
                  >
                    ערוך
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Create another CTA */}
          <button
            onClick={() => navigate("/create")}
            className="mt-10 bg-brand-primary text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            צור אווטאר חדש ✦
          </button>
        </>
      )}
    </div>
  );
}
