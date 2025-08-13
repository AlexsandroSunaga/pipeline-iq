import { Link } from "react-router-dom";

const links = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/integrations", label: "Integrations" },
  { href: "/docs", label: "Docs" },
  { href: "/status", label: "Status" },
  { href: "/", label: "Home" },
  { href: "/ops", label: "Ops dashboard" },
  { href: "/console", label: "Command" },
];

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/features" className="font-semibold text-accent">Pipeline IQ</Link>
          <nav className="flex flex-wrap gap-3 text-sm text-slate-400">
            {links.map((l) => (
              <Link key={l.href + l.label} to={l.href} className="hover:text-white">{l.label}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
    </div>
  );
}
