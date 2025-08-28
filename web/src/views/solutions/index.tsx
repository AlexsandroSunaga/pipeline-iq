import { MarketingLayout } from "@/components/MarketingLayout";

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      <h1 className="text-3xl font-semibold">Solutions</h1>
      <div className="mt-8 space-y-6">
        {[
          ["Growth analytics", "Sync directory listings and campaign leads into your warehouse."],
          ["Weather & IoT", "Normalize Open-Meteo feeds for ops dashboards."],
          ["Reference APIs", "Dedupe JSON placeholder feeds for integration tests."],
        ].map(([t, b]) => (
          <div key={t}><h2 className="font-medium text-accent">{t}</h2><p className="text-sm text-slate-400">{b}</p></div>
        ))}
      </div>
    </MarketingLayout>
  );
}
