import { MarketingLayout } from "@/components/MarketingLayout";

export default function DocsPage() {
  return (
    <MarketingLayout>
      <h1 className="text-3xl font-semibold">API docs</h1>
      <p className="mt-4 text-slate-400">FastAPI OpenAPI at <code className="text-accent">http://localhost:8013/docs</code></p>
      <pre className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-300">
{`GET  /api/v1/jobs
POST /api/v1/jobs/{source}
GET  /api/v1/records?source=posts
GET  /api/v1/export/{source}.csv
GET  /api/v1/command/overview`}
      </pre>
    </MarketingLayout>
  );
}
