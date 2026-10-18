import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageBackground } from "@/components/PageBackground";
import { LEGAL } from "@/lib/legal";

export const LegalLayout = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="min-h-screen flex flex-col items-center px-4 pt-28 pb-16" dir="rtl">
    <PageBackground />
    <main className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-10 flex flex-col gap-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-highlight to-brand-secondary" />
      <header className="space-y-1 mt-1">
        <h1 className="text-3xl font-extrabold text-brand-dark">{title}</h1>
        <p className="text-xs text-gray-400">עודכן לאחרונה: {LEGAL.lastUpdated}</p>
      </header>
      {children}
      <nav className="flex flex-wrap gap-4 border-t border-brand-muted pt-4 text-xs text-gray-500" aria-label="מסמכים משפטיים">
        <Link to="/terms" className="hover:text-brand-primary underline underline-offset-2">תנאי שימוש</Link>
        <Link to="/privacy" className="hover:text-brand-primary underline underline-offset-2">מדיניות פרטיות</Link>
        <Link to="/accessibility" className="hover:text-brand-primary underline underline-offset-2">הצהרת נגישות</Link>
      </nav>
    </main>
  </div>
);

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-2">
    <h2 className="text-lg font-bold text-brand-dark">{title}</h2>
    <div className="space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
  </section>
);

export const LegalList = ({ items }: { items: ReactNode[] }) => (
  <ul className="list-disc pr-5 space-y-1">
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);

export const ContactEmail = () => (
  <a href={`mailto:${LEGAL.contactEmail}`} className="text-brand-primary underline underline-offset-2">
    {LEGAL.contactEmail}
  </a>
);
