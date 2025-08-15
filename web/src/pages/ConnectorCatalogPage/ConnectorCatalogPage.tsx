import { Badge, Card, SimpleGrid, Text, Title } from "@mantine/core";
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
      <Title order={2}>Connector catalog</Title>
      <Text c="dimmed" mt="xs">Airbyte-style source/destination metadata for sales demos.</Text>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="lg">
        {items.map((c) => (
          <Card key={c.code} withBorder padding="md">
            <Text fw={600}>{c.name}</Text>
            <Text size="sm" c="dimmed">{c.code} · {c.type}</Text>
            <Badge mt="sm" variant="light">{c.streams} streams</Badge>
            {c.cdc ? <Badge ml="xs" color="green">CDC</Badge> : null}
            {c.destination ? <Badge ml="xs" color="violet">destination</Badge> : null}
          </Card>
        ))}
      </SimpleGrid>
    </MarketingLayout>
  );
}
