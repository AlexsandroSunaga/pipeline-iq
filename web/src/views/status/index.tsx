import { MarketingLayout } from "@/components/MarketingLayout";

export default function StatusPage() {
  return (
    <MarketingLayout>
      <h1 className="text-3xl font-semibold">System status</h1>
      <ul className="mt-6 space-y-2 text-sm">
        <li className="text-emerald-400">? API — operational (demo)</li>
        <li className="text-emerald-400">? Warehouse — operational</li>
        <li className="text-amber-400">? Schedules — monitoring</li>
      </ul>
    </MarketingLayout>
  );
}
