import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { Button } from "@/components/ui/button";
import { useAvatarContext } from "@/context/AvatarContext";
import { buildAvatarConfig } from "@/lib/avatar";
import { generateDescription } from "@/lib/description";
import { useToast } from "@/components/ui/use-toast";
import { PageBackground } from "@/components/PageBackground";

export function ResultScreen() {
  const { name, traits } = useAvatarContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [params] = useSearchParams();

  // Guard: user landed here directly without going through the create flow
  if (!name.trim()) {
    navigate("/", { replace: true });
    return null;
  }

  // Rebuild config deterministically — same name+traits always = same avatar
  const config = buildAvatarConfig(name, traits);
  const description = generateDescription(name, traits);

  const handleShare = async () => {
    // Use the Firestore doc ID from the URL so the share link loads from DB,
    // not from context (which won't exist on the recipient's browser)
    const id = params.get("id");
    const url = id
      ? `${window.location.origin}/avatar/${id}`
      : window.location.href;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard API blocked (e.g. non-HTTPS) — toast still shows
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    toast({
      title: "הקישור הועתק! ✦",
      description: "שתף אותו עם מישהו שיאהב את זה.",
      className: "bg-brand-dark text-white border-none",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16">
      <PageBackground />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-0">

        {/* Rainbow accent bar — matches landing + name screen cards */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />

        {/* Avatar — 300px is the canonical "result" size per DESIGN.md */}
        <div className="mt-2">
          <AvatarDisplay config={config} size={300} />
        </div>

        <h2 className="text-2xl font-bold text-brand-dark text-center mt-6">{name}</h2>
        <p className="text-sm text-gray-400 italic text-center mt-2">{description}</p>

        <div className="w-full h-px bg-brand-muted my-6" />

        <Button
          className="w-full rounded-xl font-semibold"
          onClick={handleShare}
        >
          {copied ? "הועתק ✓" : "שתף ✦"}
        </Button>
      </div>
    </div>
  );
}
