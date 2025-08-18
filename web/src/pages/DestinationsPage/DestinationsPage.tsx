import { Button, Card, Input, List, Select } from "antd";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/api/client";

type Dest = { id: string; name: string; kind: string; url: string; last_sync_status: string };

export default function DestinationsPage() {
  const [items, setItems] = useState<Dest[]>([]);
  const [name, setName] = useState("Slack alerts");
  const [kind, setKind] = useState("webhook");

  const load = () => apiGet<{ items: Dest[] }>("/destinations", true).then((r) => setItems(r.items)).catch(() => setItems([]));

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Destinations</h1>
      <p className="text-slate-400">Webhook and warehouse targets (Airbyte-style portfolio demo).</p>
      <Card className="bg-slate-900 border-slate-700">
        <div className="flex flex-wrap gap-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Select value={kind} onChange={setKind} options={["webhook", "s3", "snowflake", "bigquery"].map((k) => ({ value: k, label: k }))} />
          <Button
            type="primary"
            onClick={() => apiPost("/destinations", { name, kind }, true).then(() => load())}
          >
            Add destination
          </Button>
        </div>
      </Card>
      <List
        dataSource={items}
        renderItem={(d) => (
          <List.Item
            actions={[
              <Button key="t" size="small" onClick={() => apiPost(`/destinations/${d.id}/test`, {}, true).then(load)}>
                Test delivery
              </Button>,
            ]}
          >
            <List.Item.Meta title={d.name} description={`${d.kind} · ${d.url} · ${d.last_sync_status}`} />
          </List.Item>
        )}
      />
    </div>
  );
}
