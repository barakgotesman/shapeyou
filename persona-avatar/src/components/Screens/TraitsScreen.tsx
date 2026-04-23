import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TraitsForm } from "@/components/TraitsForm";
import { useAvatarContext } from "@/context/AvatarContext";
import { buildAvatarConfig } from "@/lib/avatar";
import { generateDescription } from "@/lib/description";
import { saveAvatar, getUserAvatarCount } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { PageBackground } from "@/components/PageBackground";

export function TraitsScreen() {
  const { name, traits, setName, setTraits, setAvatarId } = useAvatarContext();
  const { user, userDoc, signIn } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [limitError, setLimitError] = useState(false);

  const ANON_KEY = "shapeyou_anon_created";

  const handleGenerate = async () => {
    setLimitError(false);
    setSaving(true);
    try {
      if (user && userDoc) {
        // Logged-in: check Firestore slot count
        const count = await getUserAvatarCount(user.uid);
        if (count >= userDoc.avatarSlots) {
          setLimitError(true);
          return;
        }
      } else if (!user) {
        // Anonymous: allow only 1 creation per browser session via localStorage
        if (localStorage.getItem(ANON_KEY)) {
          setLimitError(true);
          return;
        }
      }

      const config = buildAvatarConfig(name, traits);
      const description = generateDescription(name, traits);
      const ownerUid = user?.uid ?? null;
      const id = await saveAvatar({ name, traits, config, description, ownerUid });

      // Mark anonymous creation so they can't create another without signing in
      if (!user) localStorage.setItem(ANON_KEY, "1");

      setAvatarId(id);
      navigate(`/result?id=${id}`);
    } catch {
      navigate("/result");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16 gap-8">
      <PageBackground />

      {/* Step indicator — step 2 of 2, both circles filled */}
      <div className="flex items-center gap-2 w-full max-w-2xl">
        <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-xs font-bold text-white">1</div>
        <div className="flex-1 h-1 rounded-full bg-brand-primary" />
        <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-xs font-bold text-white">2</div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold text-brand-dark">עצב את האישיות שלך, {name}</h2>
        <p className="text-sm text-gray-400">הזז את המחוונים — האווטאר שלך מתעדכן בזמן אמת.</p>
      </div>

      {/* Slot limit reached */}
      {limitError && (
        <div className="w-full max-w-md bg-red-500/15 border border-red-400/30 rounded-2xl px-5 py-4 text-center space-y-2" dir="rtl">
          {user ? (
            <>
              <p className="text-red-300 font-semibold text-sm">הגעת למגבלת האווטארים שלך ({userDoc?.avatarSlots})</p>
              <p className="text-white/50 text-xs">
                קנה משבצת נוספת ב-10 מטבעות מתוך{" "}
                <button onClick={() => navigate("/my-avatars")} className="text-brand-primary underline">
                  השייפים שלי
                </button>
              </p>
            </>
          ) : (
            <>
              <p className="text-red-300 font-semibold text-sm">כבר יצרת אווטאר אחד</p>
              <p className="text-white/50 text-xs">
                התחבר עם Google כדי ליצור עוד אווטארים ולשמור אותם{" "}
                <button onClick={() => signIn()} className="text-brand-primary underline">
                  התחבר
                </button>
              </p>
            </>
          )}
        </div>
      )}

      {/* TraitsForm is a controlled component — no preview here, preview is dev-only */}
      <TraitsForm
        name={name}
        traits={traits}
        onNameChange={setName}
        onTraitsChange={setTraits}
        onSubmit={handleGenerate}
        submitLabel={saving ? "שומר..." : "צור את האווטאר שלי ✦"}
      />

      <button
        className="text-xs text-gray-400 hover:text-brand-primary transition-colors"
        onClick={() => navigate("/create")}
      >
        ← חזור לשם
      </button>
    </div>
  );
}
