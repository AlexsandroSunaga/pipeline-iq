import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { ModuleWorkbench } from "@/components/ModuleWorkbench";

type Job = { id: number; source: string; status: string; rows: number; created_at: string };

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api<Job[]>("/jobs").then(setJobs).catch(() => setJobs([]));
  }, []);

  const rows = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  return (
    <ModuleWorkbench
      title="Run history & lineage"
      subtitle="Every ingestion attempt with source, row counts, and replay context."
      kpis={[
        { label: "Total runs", value: jobs.length },
        { label: "Success rate", value: jobs.length ? `${Math.round((jobs.filter((j) => j.status === "success").length / jobs.length) * 100)}%` : "—", tone: "ok" },
        { label: "Sources", value: new Set(jobs.map((j) => j.source)).size },
        { label: "Rows loaded", value: jobs.reduce((a, j) => a + j.rows, 0) },
      ]}
      filters={
        <div className="flex flex-wrap gap-2 text-sm">
          {["all", "success", "failed", "running"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 capitalize ${filter === f ? "bg-accent/20 text-accent" : "border border-slate-700 text-slate-400"}`}
            >
              {f}
            </button>
          ))}
        </div>
      }
      aside={
        <div className="rounded-2xl border border-slate-800 p-4 text-sm text-slate-400">
          <p className="font-medium text-white">Lineage notes</p>
          <p className="mt-2">Downstream BI treats each source as an isolated dataset. Failed runs do not advance warehouse snapshots.</p>
        </div>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-slate-500">
            <tr>
              <th className="px-4 py-2 text-left">Run</th>
              <th>Source</th>
              <th>Status</th>
              <th>Rows</th>
              <th className="px-4 py-2 text-left">Started</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((j) => (
              <tr key={j.id} className="border-t border-slate-800">
                <td className="px-4 py-2 font-mono text-xs">#{j.id}</td>
                <td className="text-center">{j.source}</td>
                <td className="text-center">{j.status}</td>
                <td className="text-center">{j.rows}</td>
                <td className="px-4 py-2 text-slate-400">{j.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModuleWorkbench>
  );
}
