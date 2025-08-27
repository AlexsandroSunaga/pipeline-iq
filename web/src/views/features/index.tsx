import { MarketingLayout } from "@/components/MarketingLayout";

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      <h1 className="text-3xl font-semibold">Pipeline features</h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 text-sm text-slate-300">
        {["Connector catalog with SLAs", "Cron schedules & run history", "Data quality rule engine", "Warehouse record browser", "Governed CSV export", "Command KPI overview"].map((f) => (
          <li key={f} className="rounded-xl border border-slate-800 p-4">{f}</li>
        ))}
      </ul>
    </MarketingLayout>
  );
}
