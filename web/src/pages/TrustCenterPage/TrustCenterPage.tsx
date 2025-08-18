import { MarketingLayout } from "@/components/MarketingLayout";
import { PageHero, FeatureGrid } from "@/components/MarketingSections";

export default function TrustCenterPage() {
  return (
    <MarketingLayout>
      <PageHero eyebrow="Trust" title="Data platform security" subtitle="SOC2-style controls for connectors, secrets, and lineage." />
      <FeatureGrid
        items={[
          { title: "Secrets vault", body: "Per-connector credentials with rotation hooks and scoped IAM roles." },
          { title: "Lineage graph", body: "Job-level provenance from source APIs through curated warehouse tables." },
          { title: "Quality gates", body: "Blocking rules before records promote to production datasets." },
          { title: "Audit exports", body: "Immutable run logs with artifact checksums for compliance reviews." },
        ]}
      />
    </MarketingLayout>
  );
}
