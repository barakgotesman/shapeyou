import { useState, useEffect } from "react";
import { TraitsForm } from "@/components/TraitsForm";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { SpeechBubble } from "@/components/Avatar/SpeechBubble";
import { buildAvatarConfig, hashSeed } from "@/lib/avatar";
import { generateQuote } from "@/lib/quotes";
import { Button } from "@/components/ui/button";
import type { Traits, AvatarConfig } from "@/lib/avatar";

const DEFAULT_TRAITS: Traits = {
  extrovert: 50, creative: 50, calm: 50, funny: 50, social: 50, gender: "other",
};

type Result = { config: AvatarConfig; quote: string; name: string };

const isDev = new URLSearchParams(window.location.search).get("dev") === "1";

export function DevPreview() {
  const [name, setName] = useState("");
  const [traits, setTraits] = useState<Traits>(DEFAULT_TRAITS);
  const [nameError, setNameError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  if (!isDev) return null;

  useEffect(() => {
    if (!name.trim()) { setResult(null); return; }
    const config = buildAvatarConfig(name.trim(), traits);
    const quote = generateQuote(traits, hashSeed(name.trim(), traits));
    setResult({ config, quote, name: name.trim() });
  }, [name, traits]);

  return (
    // force LTR on root so layout is predictable regardless of RTL html dir
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-brand-surface" dir="ltr">
      {/* Header */}
      <div className="flex items-center px-6 h-14 border-b border-brand-muted bg-white shrink-0 gap-6">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>→ חזרה</Button>
        <div className="flex-1 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-brand-primary">dev preview · </span>
          <span className="text-sm font-bold text-brand-dark">מה האישיות שלך נראית?</span>
        </div>
      </div>

      {/* Body: preview left, form right */}
      <div className="flex flex-1 overflow-hidden">

        {/* Preview panel — fills remaining space */}
        <div className="flex-1 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary flex flex-col items-center justify-center gap-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-highlight opacity-20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-secondary opacity-25 blur-3xl pointer-events-none" />

          {result ? (
            <>
              <SpeechBubble text={result.quote} />
              <AvatarDisplay config={result.config} className="w-80 h-80" />
              <p className="text-3xl font-bold text-white">{result.name}</p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-40">
              <AvatarDisplay config={buildAvatarConfig("dev", DEFAULT_TRAITS)} className="w-80 h-80" />
              <p className="text-white text-sm" dir="rtl">הזן שם כדי לראות את האווטאר</p>
            </div>
          )}
        </div>

        {/* Form panel — scrollable internally */}
        <div className="w-[45%] shrink-0 overflow-y-auto overflow-x-hidden border-l border-brand-muted bg-brand-surface py-6 px-4">
          <TraitsForm
            name={name} traits={traits}
            onNameChange={(n) => { setNameError(""); setName(n); }}
            onTraitsChange={setTraits}
            nameError={nameError}
          />
        </div>

      </div>
    </div>
  );
}
