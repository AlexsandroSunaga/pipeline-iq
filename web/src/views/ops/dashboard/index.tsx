
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, exportUrl } from "@/api/client";
import { ModuleWorkbench } from "@/components/ModuleWorkbench";

type Job = { id: number; source: string; status: string; rows: number; log: string; created_at: string };

const connectors = [
  { id: "posts", title: "Reference posts", desc: "JSON API ingestion with dedupe keys" },
  { id: "weather", title: "Open-Meteo", desc: "Hourly weather normalize job" },
  { id: "listings", title: "Directory listings", desc: "User/company fields for lead-style datasets" },
];

export default function OpsDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [err, setErr] = useState("");

  const refresh = useCallback(() => {
    api<Job[]>("/jobs")
      .then(setJobs)
      .catch(() => setErr("Start API on port 8013 (backend/)"));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function run(source: string) {
    await api(`/jobs/${source}`, { method: "POST" });
    refresh();
  }

  const success = jobs.filter((j) => j.status === "success").length;

  return (
    <ModuleWorkbench
      title="Job operations"
      subtitle="Trigger connector runs, monitor failures, and export governed datasets."
      kpis={[
        { label: "Runs (24h)", value: jobs.length, hint: "Latest 50 in table" },
        { label: "Successful", value: success, tone: "ok" },
        { label: "Failed", value: jobs.length - success, tone: jobs.length - success > 0 ? "warn" : "default" },
        { label: "Connectors", value: connectors.length },
      ]}
      actions={
        <Link to="/console" className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300">
          Command KPIs
        </Link>
      }
      aside={
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-400">
          <p className="font-medium text-white">Runbook</p>
          <ul className="mt-3 list-disc space-y-2 pl-4">
            <li>Check quality issues before promoting exports.</li>
            <li>Weather jobs are idempotent per hour bucket.</li>
            <li>Listings dedupe on external user id.</li>
          </ul>
        </div>
      }
    >
      {err && <p className="text-amber-400">{err}</p>}
      <div className="grid gap-4 md:grid-cols-3">
        {connectors.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <h2 className="font-medium">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{c.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => run(c.id)}
                className="rounded-lg bg-accent/20 px-3 py-1.5 text-sm text-accent hover:bg-accent/30"
              >
                Run job
              </button>
              <a href={exportUrl(c.id)} className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300">
                Export CSV
              </a>
            </div>
          </div>
        ))}
      </div>
      <section>
        <h2 className="text-lg font-medium">Recent runs</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th>Source</th>
                <th>Status</th>
                <th>Rows</th>
                <th className="px-4 py-2 text-left">Log</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-t border-slate-800">
                  <td className="px-4 py-2">{j.id}</td>
                  <td className="text-center">{j.source}</td>
                  <td className={`text-center ${j.status === "success" ? "text-emerald-400" : "text-red-400"}`}>
                    {j.status}
                  </td>
                  <td className="text-center">{j.rows}</td>
                  <td className="max-w-xs truncate px-4 py-2 text-slate-400">{j.log}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ModuleWorkbench>
  );
}
