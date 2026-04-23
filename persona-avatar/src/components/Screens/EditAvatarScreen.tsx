import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper.css";
import { AvatarDisplay } from "@/components/Avatar/AvatarDisplay";
import { Button } from "@/components/ui/button";
import { PageBackground } from "@/components/PageBackground";
import { useAuth } from "@/context/AuthContext";
import { subscribeAvatar, setChosenAccessory } from "@/lib/firebase";
import type { AvatarDoc } from "@/lib/firebase";
import type { AvatarConfig } from "@/lib/avatar";
import { getUnlockedAccessories, XP_UNLOCKS, FREE_ACCESSORIES } from "@/lib/avatar";
import { Accessory } from "@/components/Avatar/Accessory";

const FREE_SET = new Set<string>(FREE_ACCESSORIES);

function ScreenCentered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <PageBackground />
      {children}
    </div>
  );
}

const LABELS: Record<string, string> = {
  glasses: "משקפיים",
  hat: "כובע גבוה",
  "cowboy-hat": "קאובוי",
  beanie: "כובע סרוג",
  crown: "כתר",
  "party-hat": "מסיבה",
  headphones: "אוזניות",
  flower: "פרח",
  sunflower: "חמנייה",
  rose: "ורד",
  bow: "פפיון",
  earrings: "עגילים",
  sunglasses: "משקפי שמש",
  monocle: "מונוקל",
  "wizard-hat": "קוסם",
  "devil-horns": "שטן",
  halo: "הילה",
  "laurel-wreath": "ניצחון",
  "fire-aura": "אש",
  "angel-wings": "מלאך",
};

const HAT_ACCESSORIES = new Set(["hat", "cowboy-hat", "beanie", "crown", "party-hat", "wizard-hat"]);

type Category = { key: string; label: string; items: string[] };

const CATEGORIES: Category[] = [
  { key: "hats",    label: "כובעים",  items: ["hat", "cowboy-hat", "beanie", "crown", "party-hat", "wizard-hat"] },
  { key: "eyewear", label: "עיניים",  items: ["glasses", "sunglasses", "monocle"] },
  { key: "nature",  label: "פרחים",   items: ["flower", "sunflower", "rose"] },
  { key: "extras",  label: "תכשיטים", items: ["bow", "earrings", "headphones"] },
  { key: "special", label: "מיוחד",   items: ["halo", "devil-horns", "laurel-wreath", "fire-aura", "angel-wings"] },
];

// Segmented XP progress bar
function XPProgressBar({ xp }: { xp: number }) {
  const tiers = XP_UNLOCKS;
  let filledTiers = 0;
  for (const tier of tiers) {
    if (xp >= tier.xp) filledTiers++;
  }
  const allUnlocked = filledTiers >= tiers.length;
  const nextTier = tiers.find(t => xp < t.xp);
  const prevTierXp = filledTiers > 0 ? tiers[filledTiers - 1].xp : 0;
  const segmentProgress = nextTier ? (xp - prevTierXp) / (nextTier.xp - prevTierXp) : 1;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-medium text-gray-500">
        <span>רמת אביזרים</span>
        {allUnlocked
          ? <span className="text-green-600 font-semibold">הכל פתוח! 🏆</span>
          : <span className="text-amber-600">עוד לייקים ← אביזרים חדשים</span>
        }
      </div>
      <div className="flex gap-1 h-2.5">
        {tiers.map((tier, i) => {
          const full = i < filledTiers;
          const partial = i === filledTiers && !allUnlocked;
          return (
            <div key={tier.xp} className="flex-1 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: full ? "100%" : partial ? `${segmentProgress * 100}%` : "0%",
                  background: full
                    ? "linear-gradient(90deg,#F59E0B,#F97316)"
                    : "linear-gradient(90deg,#FCD34D,#F59E0B)",
                }}
              />
            </div>
          );
        })}
      </div>
      {!allUnlocked && nextTier && (
        <p className="text-xs text-gray-400 text-center">
          הבא: {nextTier.accessories.map(a => LABELS[a] ?? a).join(", ")}
        </p>
      )}
    </div>
  );
}

type SwiperRowProps = {
  category: Category;
  avatar: AvatarDoc;
  activeSet: Set<string>;
  isAuto: boolean;
  saving: boolean;
  isUnlocked: (acc: string) => boolean;
  onToggle: (acc: string, categoryItems: string[]) => void;
};

function CategorySwiperRow({ category, avatar, activeSet, isAuto, saving, isUnlocked, onToggle }: SwiperRowProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const selIdx = category.items.findIndex(a => activeSet.has(a));
    if (selIdx >= 0 && swiperRef.current) {
      swiperRef.current.slideTo(selIdx, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{category.label}</p>

      <div className="flex items-center gap-2">
        {/* RTL: left arrow → slideNext */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-brand-primary transition-colors text-xl leading-none select-none"
          aria-label="הבא"
        >
          ‹
        </button>

        <div className="flex-1 overflow-hidden">
          <Swiper
            slidesPerView={3}
            spaceBetween={8}
            centeredSlides
            loop={category.items.length > 2}
            onSwiper={sw => { swiperRef.current = sw; }}
          >
            {category.items.map((acc, idx) => {
              const unlocked = isUnlocked(acc);
              const isActive = !isAuto && activeSet.has(acc);
              const color = HAT_ACCESSORIES.has(acc) ? avatar.config.hatColor : avatar.config.accentColor;

              return (
                <SwiperSlide key={`${category.key}-${acc}-${idx}`}>
                  <button
                    onClick={() => !saving && unlocked && onToggle(acc, category.items)}
                    disabled={!unlocked || saving}
                    title={!unlocked ? "נעול — אסוף עוד לייקים כדי לפתוח" : LABELS[acc]}
                    className={[
                      "w-full flex flex-col items-center gap-1.5 rounded-2xl border-2 py-3 px-2 transition-all focus:outline-none",
                      !unlocked
                        ? "border-gray-100 bg-gray-50 cursor-not-allowed"
                        : isActive
                        ? "border-brand-primary bg-brand-primary/8 shadow-md cursor-pointer"
                        : "border-gray-200 bg-white hover:border-brand-primary/40 cursor-pointer",
                    ].join(" ")}
                  >
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ opacity: unlocked ? 1 : 0.35 }}>
                        <Accessory variant={acc} color={color} faceShape={avatar.config.faceShape} />
                      </svg>
                      {!unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl opacity-60">🔒</span>
                        </div>
                      )}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center shadow">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className={["text-xs font-medium", isActive ? "text-brand-primary" : "text-gray-500"].join(" ")}>
                      {LABELS[acc] ?? acc}
                    </span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* RTL: right arrow → slidePrev */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-brand-primary transition-colors text-xl leading-none select-none"
          aria-label="הקודם"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function EditAvatarScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [avatar, setAvatar] = useState<AvatarDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selection, setSelection] = useState<string[] | null>(null);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    const unsub = subscribeAvatar(id, doc => {
      setAvatar(prev => {
        if (!prev) setSelection(doc.chosenAccessory);
        return doc;
      });
      setLoading(false);
    });
    const timeout = setTimeout(() => {
      setLoading(was => { if (was) { setNotFound(true); } return false; });
    }, 8000);
    return () => { unsub(); clearTimeout(timeout); };
  }, [id]);

  const isOwner = !!user && !!avatar && avatar.ownerUid === user.uid;
  const xp = Math.max(avatar?.xp ?? 0, avatar?.likes ?? 0);
  const unlockedSet = new Set(getUnlockedAccessories(xp).map(String));
  const isUnlocked = (acc: string) => FREE_SET.has(acc) || unlockedSet.has(acc);

  const isAuto = selection === null;
  const activeSet = new Set(selection ?? []);

  const saveSelection = async (next: string[] | null) => {
    if (!id) return;
    setSelection(next);
    setSaving(true);
    try {
      await setChosenAccessory(id, next);
    } catch {
      setSelection(avatar?.chosenAccessory ?? null);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (acc: string, categoryItems: string[]) => {
    if (!isOwner || saving || !isUnlocked(acc)) return;
    const withoutCategory = (selection ?? []).filter(a => !categoryItems.includes(a));
    saveSelection(activeSet.has(acc) ? withoutCategory : [...withoutCategory, acc]);
  };

  const handleAuto = () => {
    if (!isOwner || saving) return;
    saveSelection(null);
  };

  if (loading) return <ScreenCentered><p className="text-brand-primary animate-pulse text-lg font-semibold">טוען...</p></ScreenCentered>;
  if (notFound || !avatar) return <ScreenCentered><p className="text-2xl font-bold text-brand-dark">האווטאר לא נמצא</p><Button onClick={() => navigate("/")}>חזור לדף הבית</Button></ScreenCentered>;
  if (!isOwner) return <ScreenCentered><p className="text-2xl font-bold text-brand-dark">אין לך גישה לערוך אווטאר זה</p><Button onClick={() => navigate(`/avatar/${id}`)}>צפה בפרופיל</Button></ScreenCentered>;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-20 gap-6" dir="rtl">
      <PageBackground />

      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark">התאם אישית את האווטאר</h1>
        <p className="text-sm text-gray-500 mt-1">בחר אביזר לאווטאר של {avatar.name}</p>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-start">
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />

        {/* Avatar preview */}
        <div className="flex flex-col items-center gap-3 w-full lg:w-auto lg:min-w-[220px]">
          <AvatarDisplay
            config={avatar.config as AvatarConfig}
            chosenAccessory={selection}
            size={220}
          />
          <p className="text-base font-semibold text-brand-dark">{avatar.name}</p>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <span>❤️</span>
            <span>{avatar.likes} לייקים</span>
          </div>
          {saving && (
            <p className="text-xs text-brand-primary animate-pulse">שומר...</p>
          )}
        </div>

        {/* Picker + XP bar */}
        <div className="flex-1 flex flex-col gap-5 w-full min-w-0">

          {/* XP Progress */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
            <XPProgressBar xp={xp} />
          </div>

          {/* Reset to auto */}
          <button
            onClick={handleAuto}
            disabled={saving || isAuto}
            className={[
              "w-full text-sm rounded-xl border-2 py-2 px-4 transition-all",
              isAuto
                ? "border-brand-primary bg-brand-primary/10 text-brand-primary font-semibold"
                : "border-gray-200 text-gray-500 hover:border-brand-primary/40",
            ].join(" ")}
          >
            ✨ אוטומטי (ברירת מחדל) — מנקה את כל הבחירות
          </button>

          {/* Category swipers */}
          <div className="flex flex-col gap-4">
            {CATEGORIES.map(cat => (
              <CategorySwiperRow
                key={cat.key}
                category={cat}
                avatar={avatar}
                activeSet={activeSet}
                isAuto={isAuto}
                saving={saving}
                isUnlocked={isUnlocked}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>

      <Button variant="outline" onClick={() => navigate(`/avatar/${id}`)}>
        ← חזור לפרופיל
      </Button>
    </div>
  );
}
