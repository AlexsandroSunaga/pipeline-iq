
import { useEffect, useState } from "react";
import { api } from "@/api/client";

export default function Page() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api("/quality/issues").then(setRows); }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Data quality governance</h1>
      <div className="mt-6 space-y-3">{rows.map((q) => <div key={q.id} className="rounded-xl border border-slate-800 p-4"><p className="font-medium">{q.rule}</p><p className="text-sm text-slate-500">{q.connector_code} · {q.severity} · {q.status}</p></div>)}</div>
    </div>
  );
}
