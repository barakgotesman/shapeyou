import { useLocation } from "react-router-dom";

export function Footer({ force = false }: { force?: boolean }) {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  // Landing page embeds its own Footer inside the h-screen layout
  if (!force && pathname === "/") return null;

  return (
    <footer className="w-full border-t border-white/10 py-5 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs" dir="rtl">
      <span>© {year} ShapeYou · כל הזכויות שמורות</span>
      <div className="flex items-center gap-4">
        <a href="/leaderboard" className="hover:text-white/60 transition-colors">האהובים ביותר</a>
        <a href="/create" className="hover:text-white/60 transition-colors">צור אווטאר</a>
      </div>
    </footer>
  );
}
