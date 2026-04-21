import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { buildAvatarConfig } from "@/lib/avatar";
import type { Traits, Gender } from "@/lib/avatar";
import { cn } from "@/lib/utils";

const TRAIT_LABELS: { key: keyof Omit<Traits, "gender">; lo: string; hi: string; label: string }[] = [
  { key: "extrovert", lo: "מופנם",     hi: "מוחצן",  label: "אנרגיה"    },
  { key: "creative",  lo: "מעשי",      hi: "יצירתי", label: "יצירתיות"  },
  { key: "calm",      lo: "אינטנסיבי", hi: "רגוע",   label: "שלוות נפש" },
  { key: "funny",     lo: "רציני",     hi: "מצחיק",  label: "הומור"     },
  { key: "social",    lo: "שמרן",      hi: "פתוח",   label: "פתיחות"    },
];

const GENDER_OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: "female", label: "נקבה", icon: "♀" },
  { value: "other",  label: "אחר",  icon: "✦" },
  { value: "male",   label: "זכר",  icon: "♂" },
];

type Props = {
  name: string;
  traits: Traits;
  onNameChange: (name: string) => void;
  onTraitsChange: (traits: Traits) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  nameError?: string;
  showPreview?: boolean;
};

export function TraitsForm({
  name,
  traits,
  onNameChange,
  onTraitsChange,
  onSubmit,
  submitLabel = "צור את האווטאר שלי ✦",
  nameError,
  showPreview = false,
}: Props) {
  const config = buildAvatarConfig(name || "תצוגה", traits);

  const setTrait = (key: keyof Omit<Traits, "gender">, value: number) =>
    onTraitsChange({ ...traits, [key]: value });

  const setGender = (gender: Gender) =>
    onTraitsChange({ ...traits, gender });

  return (
    <div className={`grid gap-8 w-full ${showPreview ? "grid-cols-1 md:grid-cols-2 max-w-2xl" : "grid-cols-1 max-w-lg"}`}>

      {/* ── Sliders card ── */}
      <Card className="relative bg-white border border-brand-muted rounded-2xl shadow-md overflow-hidden">
        {/* Rainbow top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />
        <CardContent className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark">עצב את האישיות שלך</h2>
            <p className="text-sm text-gray-400 mt-1">הזז את המחוונים — האווטאר שלך מתעדכן בזמן אמת.</p>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">השם שלך</label>
            <Input
              placeholder="לדוגמה: דניאל"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
            {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">מגדר</label>
            <div className="grid grid-cols-3 gap-2">
              {GENDER_OPTIONS.map(({ value, label, icon }) => {
                const selected = traits.gender === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setGender(value)}
                    className="flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-sm font-medium transition-all"
                    // inline style required for dynamic selected state — Tailwind JIT can't resolve conditional brand-* classes
                    style={selected
                      ? { backgroundColor: "#6C63FF", borderColor: "#6C63FF", color: "#fff", boxShadow: "0 2px 8px rgba(108,99,255,0.25)" }
                      : { backgroundColor: "#fff", borderColor: "#EDE9FE", color: "#6b7280" }
                    }
                  >
                    <span className="text-lg leading-none">{icon}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trait sliders */}
          <div className="space-y-5">
            {TRAIT_LABELS.map(({ key, lo, hi, label }) => (
              <div key={key} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
                  <span className="text-xs font-semibold tabular-nums text-brand-primary">{traits[key]}</span>
                </div>
                <Slider
                  min={0} max={100} step={1}
                  value={[traits[key]]}
                  onValueChange={([v]) => setTrait(key, v)}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{hi}</span>
                  <span>{lo}</span>
                </div>
              </div>
            ))}
          </div>

          {onSubmit && (
            <Button variant="highlight" size="lg" className="w-full" onClick={onSubmit}>
              {submitLabel}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── Preview card — dev only ── */}
      {showPreview && (
        <Card className="bg-white border border-brand-muted rounded-2xl shadow-sm">
          <CardContent className="p-8 flex flex-col items-center justify-center gap-4 h-full">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest self-start">תצוגה מקדימה</p>
            <AvatarDisplay config={config} className="w-52 h-52 sm:w-60 sm:h-60" />
            <p className="text-lg font-semibold text-brand-dark text-center">
              {name || <span className="text-gray-300">השם שלך כאן</span>}
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
