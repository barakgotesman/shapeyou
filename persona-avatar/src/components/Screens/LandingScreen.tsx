import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { AvatarCarousel } from "@/components/AvatarCarousel";
import { buildAvatarConfig } from "@/lib/avatar";
import { useStats } from "@/hooks/useStats";
import type { Traits } from "@/lib/avatar";

const HERO_TRAITS: Traits = {
  extrovert: 72, creative: 80, calm: 55, funny: 65, social: 70, gender: "other",
};
const heroConfig = buildAvatarConfig("ShapeYou", HERO_TRAITS);

const GRID_PERSONAS: { name: string; traits: Traits }[] = [
  { name: "דניאל",  traits: { extrovert: 80, creative: 70, calm: 60, funny: 40, social: 75, gender: "male"   } },
  { name: "מיה",    traits: { extrovert: 30, creative: 90, calm: 75, funny: 50, social: 40, gender: "female" } },
  { name: "עומר",   traits: { extrovert: 60, creative: 45, calm: 20, funny: 85, social: 65, gender: "male"   } },
  { name: "נועה",   traits: { extrovert: 55, creative: 60, calm: 80, funny: 30, social: 55, gender: "female" } },
  { name: "יונתן",  traits: { extrovert: 90, creative: 55, calm: 35, funny: 70, social: 90, gender: "male"   } },
  { name: "שירה",   traits: { extrovert: 40, creative: 85, calm: 65, funny: 60, social: 45, gender: "female" } },
  { name: "אריאל",  traits: { extrovert: 50, creative: 50, calm: 50, funny: 50, social: 50, gender: "other"  } },
  { name: "תמר",    traits: { extrovert: 20, creative: 75, calm: 90, funny: 25, social: 30, gender: "female" } },
  { name: "רועי",   traits: { extrovert: 75, creative: 30, calm: 40, funny: 90, social: 80, gender: "male"   } },
  { name: "ליאור",  traits: { extrovert: 65, creative: 65, calm: 55, funny: 65, social: 60, gender: "other"  } },
  { name: "יעל",    traits: { extrovert: 35, creative: 80, calm: 70, funny: 45, social: 35, gender: "female" } },
  { name: "אבי",    traits: { extrovert: 85, creative: 40, calm: 25, funny: 75, social: 85, gender: "male"   } },
  { name: "ריטה",   traits: { extrovert: 45, creative: 95, calm: 60, funny: 55, social: 50, gender: "female" } },
  { name: "גל",     traits: { extrovert: 70, creative: 60, calm: 45, funny: 80, social: 70, gender: "other"  } },
  { name: "איתן",   traits: { extrovert: 55, creative: 35, calm: 85, funny: 20, social: 45, gender: "male"   } },
];

const GRID_CONFIGS = GRID_PERSONAS.map(p => ({
  ...p,
  config: buildAvatarConfig(p.name, p.traits),
}));

// Split into 3 columns of 5, each doubled for seamless loop
const COL_A = [...GRID_CONFIGS.slice(0, 5),  ...GRID_CONFIGS.slice(0, 5)];
const COL_B = [...GRID_CONFIGS.slice(5, 10), ...GRID_CONFIGS.slice(5, 10)];
const COL_C = [...GRID_CONFIGS.slice(10, 15),...GRID_CONFIGS.slice(10, 15)];

function AvatarColumn({ items, direction, duration }: {
  items: typeof COL_A;
  direction: "up" | "down";
  duration: number;
}) {
  return (
    <div style={{ overflow: "hidden", flex: 1 }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        animation: `marquee-${direction} ${duration}s linear infinite`,
      }}>
        {items.map(({ name, config }, i) => (
          <div key={`${name}-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <AvatarDisplay config={config} size={88} static />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingScreen() {
  const navigate = useNavigate();
  const stats = useStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-[#2d2870] to-brand-primary relative overflow-hidden">

      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-highlight opacity-10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-brand-secondary opacity-15 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-72 h-72 rounded-full bg-brand-primary opacity-20 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="land-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" opacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#land-dots)" />
        </svg>
      </div>

      {/* ── Desktop: two-column layout ── */}
      {/* dir=ltr so flex order matches visual left/right regardless of RTL html */}
      <div className="relative z-10 hidden lg:flex min-h-screen" dir="ltr">

        {/* Left: 3-column vertical avatar waterfall */}
        <div className="flex-1 flex gap-4 px-8 py-8 overflow-hidden" style={{ maxHeight: "100vh" }}>
          <AvatarColumn items={COL_A} direction="up"   duration={18} />
          <AvatarColumn items={COL_B} direction="down" duration={22} />
          <AvatarColumn items={COL_C} direction="up"   duration={20} />
        </div>

        {/* Right: hero + card */}
        <div className="flex flex-col items-center justify-center px-10 py-12 w-[460px] shrink-0 gap-8" dir="rtl">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(252,211,77,0.15)", color: "#FCD34D", border: "1px solid rgba(252,211,77,0.3)" }}>
              ✦ גלה את האישיות שלך
            </div>
            <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
              מה האישיות<br />
              <span style={{ color: "#FCD34D" }}>שלך נראית?</span>
            </h1>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              ענה על 5 מחוונים — קבל דמות ייחודית שנוצרת רק בשבילך.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-2xl w-full p-8 flex flex-col items-center gap-5">
            <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />
            <div className="relative mt-1">
              <div className="absolute inset-0 rounded-full bg-brand-secondary blur-xl opacity-50 scale-110" />
              <AvatarDisplay config={heroConfig} size={160} className="relative" />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-brand-dark">צור את האווטאר שלך</h2>
              <p className="text-sm text-gray-400">לוקח פחות מדקה · בלי הרשמה · רק כיף</p>
            </div>
            <Button variant="highlight" size="lg" className="w-full font-bold text-base rounded-xl" onClick={() => navigate("/create")}>
              צור את האווטאר שלי ✦
            </Button>
            <div className="flex gap-6 w-full justify-center border-t border-brand-muted pt-4">
              <div className="text-center">
                <p className="text-2xl font-black text-brand-dark">{stats.loading ? "..." : stats.totalAvatars.toLocaleString()}</p>
                <p className="text-xs text-gray-400">אווטארים נוצרו</p>
              </div>
              <div className="w-px bg-brand-muted" />
              <div className="text-center">
                <p className="text-2xl font-black text-brand-dark">{stats.loading ? "..." : stats.last24h.toLocaleString()}</p>
                <p className="text-xs text-gray-400">היום</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="relative z-10 flex flex-col items-center lg:hidden px-4 pt-28 pb-0 gap-8">
        <div className="text-center max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: "rgba(252,211,77,0.15)", color: "#FCD34D", border: "1px solid rgba(252,211,77,0.3)" }}>
            ✦ גלה את האישיות שלך
          </div>
          <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
            מה האישיות<br />
            <span style={{ color: "#FCD34D" }}>שלך נראית?</span>
          </h1>
          <p className="text-lg text-white/60 font-light leading-relaxed">
            ענה על 5 מחוונים — קבל דמות ייחודית שנוצרת רק בשבילך.<br />
            <span className="text-white/40 text-base">אף אחד אחר לא יקבל בדיוק אותו דבר.</span>
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-5">
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />
          <div className="relative mt-1">
            <div className="absolute inset-0 rounded-full bg-brand-secondary blur-xl opacity-50 scale-110" />
            <AvatarDisplay config={heroConfig} size={160} className="relative" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-brand-dark">צור את האווטאר שלך</h2>
            <p className="text-sm text-gray-400">לוקח פחות מדקה · בלי הרשמה · רק כיף</p>
          </div>
          <Button variant="highlight" size="lg" className="w-full font-bold text-base rounded-xl" onClick={() => navigate("/create")}>
            צור את האווטאר שלי ✦
          </Button>
          <div className="flex gap-6 w-full justify-center border-t border-brand-muted pt-4">
            <div className="text-center">
              <p className="text-2xl font-black text-brand-dark">{stats.loading ? "..." : stats.totalAvatars.toLocaleString()}</p>
              <p className="text-xs text-gray-400">אווטארים נוצרו</p>
            </div>
            <div className="w-px bg-brand-muted" />
            <div className="text-center">
              <p className="text-2xl font-black text-brand-dark">{stats.loading ? "..." : stats.last24h.toLocaleString()}</p>
              <p className="text-xs text-gray-400">היום</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-0">
          <AvatarCarousel />
        </div>
      </div>

    </div>
  );
}
