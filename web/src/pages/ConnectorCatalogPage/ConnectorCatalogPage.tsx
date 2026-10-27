import { useEffect, useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { api } from "@/api/client";

type Connector = { code: string; name: string; type: string; streams: number; cdc?: boolean; destination?: boolean };

export default function ConnectorCatalogPage() {
  const [items, setItems] = useState<Connector[]>([]);
  useEffect(() => {
    api<{ items: Connector[] }>("/catalog/connectors").then((r) => setItems(r.items)).catch(() => setItems([]));
  }, []);

  return (
    <MarketingLayout>
      <h2 className="text-2xl font-semibold">Connector catalog</h2>
      <p className="mt-2 text-sm text-slate-500">Airbyte-style source/destination metadata for sales demos.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.code} className="rounded-xl border border-slate-700 p-4">
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-slate-500">{c.code} · {c.type}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-300">{c.streams} streams</span>
              {c.cdc ? <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-green-300">CDC</span> : null}
              {c.destination ? <span className="rounded-full bg-violet-900/40 px-2 py-0.5 text-violet-300">destination</span> : null}
            </div>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
