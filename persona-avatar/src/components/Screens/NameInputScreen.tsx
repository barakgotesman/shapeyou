import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAvatarContext } from "@/context/AvatarContext";
import { useAuth } from "@/context/AuthContext";

export function NameInputScreen() {
  const { name, setName } = useAvatarContext();
  const { user, loading: authLoading, signIn } = useAuth();
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2)  { setError("השם חייב להכיל לפחות 2 תווים."); return; }
    if (trimmed.length > 20) { setError("השם לא יכול לעלות על 20 תווים."); return; }
    setError("");
    navigate("/create?step=traits");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-highlight opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-secondary opacity-25 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col gap-6">

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />

        {/* Step indicator — step 1 active (brand-primary), step 2 inactive (brand-muted) */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-xs font-bold text-white">1</div>
          <div className="flex-1 h-1 rounded-full bg-brand-muted" />
          <div className="w-6 h-6 rounded-full bg-brand-muted flex items-center justify-center text-xs font-bold text-gray-300">2</div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-brand-dark">מה השם שלך?</h2>
          <p className="text-sm text-gray-400">השם מעצב את האווטאר שלך.</p>
        </div>

        <div className="space-y-1">
          <Input
            dir="rtl"
            placeholder="לדוגמה: דניאל"
            value={name}
            onChange={e => { setName(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleContinue()}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Sign-in nudge — shown only when not signed in and not dismissed */}
        {!authLoading && !user && !dismissed && (
          <div className="flex items-start gap-3 bg-brand-primary/8 border border-brand-primary/20 rounded-xl px-4 py-3 text-right" dir="rtl">
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-brand-primary">רוצה לשמור ולערוך את האווטאר שלך?</p>
              <p className="text-xs text-gray-400">התחבר עם Google כדי שנשמור אותו עבורך ותוכל לערוך אותו בעתיד.</p>
              <button
                onClick={signIn}
                className="text-xs font-bold text-brand-primary underline underline-offset-2 hover:opacity-70 transition-opacity mt-0.5"
              >
                התחבר עם Google ←
              </button>
            </div>
            {/* Dismiss X */}
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-300 hover:text-gray-500 transition-colors text-base leading-none mt-0.5"
              aria-label="סגור"
            >
              ✕
            </button>
          </div>
        )}

        {/* default variant = bg-brand-primary text-white */}
        <Button size="lg" className="w-full" onClick={handleContinue}>
          המשך ←
        </Button>

        <button
          className="text-xs text-gray-400 hover:text-brand-primary text-center transition-colors"
          onClick={() => navigate("/")}
        >
          ← חזור
        </button>
      </div>
    </div>
  );
}
