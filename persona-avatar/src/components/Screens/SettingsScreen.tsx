import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PageBackground } from "@/components/PageBackground";

export function SettingsScreen() {
  const { user, loading, showNameInProfile, updateNameSetting } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (!user) {
    navigate("/");
    return null;
  }

  const showName = showNameInProfile;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16" dir="rtl">
      <PageBackground />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col gap-6">
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />

        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-brand-dark">הגדרות</h2>
          <p className="text-sm text-gray-400">{user.displayName ?? user.email}</p>
        </div>

        {/* Toggle row */}
        <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-brand-dark">הצג את שמי בפרופיל השייפיו</p>
            <p className="text-xs text-gray-400">
              {showName
                ? "שמך מוצג בפרופיל — כל אחד שפותח את הקישור רואה אותו"
                : "שמך מוסתר — המבקרים יראו \"מישהו\" במקום"}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={showName}
            onClick={() => updateNameSetting(!showName)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              showName ? "bg-brand-primary" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                showName ? "-translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <button
          className="text-xs text-gray-400 hover:text-brand-primary text-center transition-colors"
          onClick={() => navigate(-1)}
        >
          ← חזור
        </button>
      </div>
    </div>
  );
}
