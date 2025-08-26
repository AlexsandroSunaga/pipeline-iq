
import { useEffect, useState } from "react";
import { api } from "@/api/client";

export default function Page() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api("/schedules").then(setRows); }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Job schedules</h1>
      <ul className="mt-6 space-y-2">{rows.map((s) => <li key={s.id} className="rounded-lg border border-slate-800 p-4 font-mono text-sm">{s.connector_code} · {s.cron_label} · {s.enabled ? "enabled" : "paused"}</li>)}</ul>
    </div>
  );
}
