import { MarketingLayout } from "@/components/MarketingLayout";

export default function IntegrationsPage() {
  return (
    <MarketingLayout>
      <h1 className="text-3xl font-semibold">Integrations</h1>
      <p className="mt-4 text-slate-400">Demo connectors ship in the FastAPI backend; add Airbyte-style plugins in production.</p>
      <table className="mt-8 w-full text-sm">
        <thead className="text-slate-500"><tr><th className="text-left py-2">Code</th><th className="text-left">Source</th></tr></thead>
        <tbody>
          {["posts", "weather", "listings"].map((c) => (
            <tr key={c} className="border-t border-slate-800"><td className="py-2 font-mono text-accent">{c}</td><td>Public REST API</td></tr>
          ))}
        </tbody>
      </table>
    </MarketingLayout>
  );
}
