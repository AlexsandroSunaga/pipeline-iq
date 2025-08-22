
import { useCallback, useEffect, useState } from "react";
import { api, exportUrl } from "@/api/client";

type Job = { id: number; source: string; status: string; rows: number; log: string; created_at: string };

const connectors = [
  { id: "posts", title: "Reference posts", desc: "JSON API ingestion with dedupe keys" },
  { id: "weather", title: "Open-Meteo", desc: "Hourly weather normalize job" },
  { id: "listings", title: "Directory listings", desc: "User/company fields for lead-style datasets" },
];

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [err, setErr] = useState("");

  const refresh = useCallback(() => {
    api<Job[]>("/jobs")
      .then(setJobs)
      .catch(() => setErr("Start API: uvicorn on port 8013"));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function run(source: string) {
    await api(`/api/v1/jobs/${source}`, { method: "POST" });
    refresh();
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Operations dashboard</h1>
        <p className="mt-2 text-slate-400">Trigger connectors, audit job runs, export governed CSVs.</p>
      </div>
      {err && <p className="text-amber-400">{err}</p>}

      <div className="grid gap-4 md:grid-cols-3">
        {connectors.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <h2 className="font-medium">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{c.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => run(c.id)}
                className="rounded-lg bg-accent/20 px-3 py-1.5 text-sm text-accent hover:bg-accent/30"
              >
                Run job
              </button>
              <a to={exportUrl(c.id)} className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300">
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
                  <td className="px-4 py-2 text-slate-400 truncate max-w-xs">{j.log}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
