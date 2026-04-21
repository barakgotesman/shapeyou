import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TraitsForm } from "@/components/TraitsForm";
import { useAvatarContext } from "@/context/AvatarContext";
import { buildAvatarConfig } from "@/lib/avatar";
import { generateDescription } from "@/lib/description";
import { saveAvatar } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { PageBackground } from "@/components/PageBackground";

export function TraitsScreen() {
  const { name, traits, setName, setTraits, setAvatarId } = useAvatarContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  // Prevents double-submit while Firestore write is in flight
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    setSaving(true);
    try {
      // Build config + description here so they're saved to Firestore alongside raw traits.
      // The shared view uses the stored config directly — no need to rebuild on load.
      const config = buildAvatarConfig(name, traits);
      const description = generateDescription(name, traits);
      // Store the signed-in user's uid so they can edit this avatar later.
      // null means the avatar was created anonymously — no edit access.
      const ownerUid = user?.uid ?? null;
      const id = await saveAvatar({ name, traits, config, description, ownerUid });
      setAvatarId(id);
      // Pass the Firestore ID in the URL so ResultScreen can construct the correct share link
      navigate(`/result?id=${id}`);
    } catch {
      // Firestore failed — still navigate so the user sees their avatar (share won't work)
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
