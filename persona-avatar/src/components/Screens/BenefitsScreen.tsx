import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: "💾",
    title: "שמירת האווטארים שלך",
    desc: "כל האווטארים שתיצור יישמרו לחשבון שלך — תוכל לגשת אליהם מכל מכשיר בכל זמן.",
  },
  {
    icon: "✏️",
    title: "עריכה חופשית",
    desc: "החלף אביזרים, נסה צבעים חדשים וגלה שילובים שמתאימים לך — רק בעלי חשבון יכולים לערוך.",
  },
  {
    icon: "🏆",
    title: "מטבעות יומיים",
    desc: "כניסה יומית מזכה אותך במטבע — אסוף אותם כדי לפתוח אביזרים נדירים שאי-אפשר להשיג אחרת.",
  },
  {
    icon: "⭐",
    title: "XP ושדרוגים",
    desc: "ככל שהאווטאר שלך מקבל לייקים הוא צובר XP ופותח אביזרים בלעדיים — עצם הכניסה שומרת על ההתקדמות שלך.",
  },
  {
    icon: "🔗",
    title: "שיתוף עם קישור ייחודי",
    desc: "כל אווטאר מקבל עמוד פרופיל ציבורי משלו — שתף עם חברים ותן להם ללייק אותו.",
  },
];

export function BenefitsScreen() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      dir="rtl"
    >
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-highlight opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-secondary opacity-25 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">למה להירשם ל-ShapeYou?</h1>
          <p className="text-brand-highlight/80 text-sm">
            צור אווטאר חינם לכולם — אבל המשתמשים המחוברים מקבלים הרבה יותר.
          </p>
        </div>

        {/* Benefits cards */}
        <div className="flex flex-col gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 flex items-start gap-4"
            >
              <span className="text-2xl leading-none mt-0.5">{b.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{b.title}</p>
                <p className="text-white/70 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          {!user ? (
            <Button
              size="lg"
              className="w-full bg-white text-brand-primary hover:bg-white/90 font-bold"
              onClick={signIn}
            >
              התחבר עם Google ←
            </Button>
          ) : (
            <div className="text-center text-white/80 text-sm py-2">
              ✅ אתה כבר מחובר — כל היתרונות פעילים עבורך!
            </div>
          )}
          <button
            className="text-xs text-white/50 hover:text-white/80 text-center transition-colors"
            onClick={() => navigate("/create")}
          >
            ← חזור ליצירת האווטאר
          </button>
        </div>
      </div>
    </div>
  );
}
