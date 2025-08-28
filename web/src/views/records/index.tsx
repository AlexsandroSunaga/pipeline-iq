
import { useEffect, useState } from "react";
import { api } from "@/api/client";

export default function RecordsPage() {
  const [source, setSource] = useState("posts");
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    api<any[]>(`/records?source=${source}&limit=40`)
      .then(setRows)
      .catch(() => setRows([]));
  }, [source]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Record browser</h1>
      <select
        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="posts">posts</option>
        <option value="weather">weather</option>
        <option value="listings">listings</option>
      </select>
      <pre className="max-h-[70vh] overflow-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-xs">
        {JSON.stringify(rows, null, 2)}
      </pre>
    </div>
  );
}
