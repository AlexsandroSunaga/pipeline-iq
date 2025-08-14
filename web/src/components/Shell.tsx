import { Link } from "react-router-dom";
import { Clock, Database, GitBranch, History, LayoutDashboard, Plug, Shield, Table2 } from "lucide-react";

const nav = [
  { href: "/console", label: "Command", icon: LayoutDashboard },
  { href: "/ops", label: "Job dashboard", icon: Database },
  { href: "/console/jobs", label: "Run history", icon: History },
  { href: "/console/connectors", label: "Connectors", icon: Plug },
  { href: "/console/schedules", label: "Schedules", icon: Clock },
  { href: "/console/quality", label: "Data quality", icon: Shield },
  { href: "/records", label: "Warehouse", icon: Table2 },
  { href: "/console/destinations", label: "Destinations", icon: GitBranch },
];

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-semibold text-accent">Pipeline IQ</span>
          <nav className="flex flex-wrap gap-4 text-sm text-slate-400">
            {nav.map((n) => (
              <Link key={n.href} to={n.href} className="flex items-center gap-1 hover:text-white">
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
