
import { useEffect, useState } from "react";
import { api } from "@/api/client";

export default function Page() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api("/connectors").then(setRows); }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Connector catalog</h1>
      <table className="mt-6 w-full text-sm"><thead className="text-slate-500"><tr><th className="p-3 text-left">Code</th><th>Name</th><th>Owner</th><th>SLA</th><th>Status</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.code} className="border-t border-slate-800"><td className="p-3 font-mono text-accent">{r.code}</td><td>{r.name}</td><td>{r.owner_team}</td><td>{r.sla_minutes}m</td><td>{r.status}</td></tr>)}</tbody></table>
    </div>
  );
}
