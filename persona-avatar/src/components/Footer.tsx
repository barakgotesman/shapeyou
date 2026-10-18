import { useLocation, Link } from "react-router-dom";

type FooterLink = { to: string; label: string };

const SITE_LINKS: FooterLink[] = [
  { to: "/create", label: "צור אווטאר" },
  { to: "/leaderboard", label: "האהובים ביותר" },
  { to: "/benefits", label: "יתרונות ההתחברות" },
];

const LEGAL_LINKS: FooterLink[] = [
  { to: "/terms", label: "תנאי שימוש" },
  { to: "/privacy", label: "מדיניות פרטיות" },
  { to: "/accessibility", label: "הצהרת נגישות" },
];

const linkClass =
  "text-sm text-white/65 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight";

const FooterLinks = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <nav aria-label={title} className="space-y-2.5">
    <h2 className="text-xs font-bold uppercase tracking-widest text-brand-highlight/80">{title}</h2>
    <ul className="space-y-1.5">
      {links.map(({ to, label }) => (
        <li key={to}>
          <Link to={to} className={linkClass}>{label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export const Footer = ({ force = false }: { force?: boolean }) => {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  if (!force && pathname === "/") return null;

  return (
    <footer className="w-full border-t border-white/10 bg-black/15 backdrop-blur-sm px-6 pt-8 pb-5" dir="rtl">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row sm:justify-between gap-8">
        <div className="max-w-xs space-y-2">
          <Link to="/" className="inline-block text-xl font-bold text-white tracking-tight rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight">
            Shape<span className="text-brand-highlight">You</span>
          </Link>
          <p className="text-sm text-white/55 leading-relaxed">
            ענה על 5 מחוונים וקבל דמות ייחודית שמייצגת את האישיות שלך.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <FooterLinks title="האתר" links={SITE_LINKS} />
          <FooterLinks title="מידע משפטי" links={LEGAL_LINKS} />
        </div>
      </div>

      <div className="mx-auto max-w-5xl mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-white/45">
        <span>© {year} ShapeYou · כל הזכויות שמורות</span>
        <span>האווטארים נוצרים לבידור בלבד</span>
      </div>
    </footer>
  );
};
