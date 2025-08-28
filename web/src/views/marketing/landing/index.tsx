import { Link } from "react-router-dom";
import { MarketingLayout } from "@/components/MarketingLayout";
import { FaqSection, ProcessSteps, StatsRow } from "@/components/MarketingSections";

export default function LandingPage() {
  return (
    <MarketingLayout>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Data platform</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-5xl">
        Governed ingestion, warehouse exports, and quality gates for analytics teams.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        Pipeline IQ connects to public and partner APIs, dedupes records, schedules jobs, tracks SLA breaches, and
        ships analyst-ready CSVs — with a full operator console, not a single-page demo.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/ops" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-slate-950">Open job dashboard</Link>
        <Link to="/console" className="rounded-full border border-slate-700 px-5 py-2.5 text-sm">Command center</Link>
        <Link to="/features" className="rounded-full border border-slate-700 px-5 py-2.5 text-sm text-slate-300">Product tour</Link>
      </div>
      <StatsRow
        items={[
          { label: "Connectors shipped", value: "12+" },
          { label: "Median job latency", value: "4.2 min" },
          { label: "Rows in demo warehouse", value: "48k" },
          { label: "Open quality rules", value: "6" },
        ]}
      />
      <ProcessSteps
        steps={[
          { title: "Connect", body: "Register sources, owners, and SLA minutes per connector." },
          { title: "Orchestrate", body: "Cron schedules, manual runs, and dedupe keys on ingest." },
          { title: "Deliver", body: "Warehouse browse, CSV export, and quality issue triage." },
        ]}
      />
      <FaqSection
        items={[
          { q: "Is this a real ETL engine?", a: "The demo runs live HTTP jobs into SQLite with production-style routes and console modules." },
          { q: "Where do analysts work?", a: "Use Records warehouse, exports, and the quality module before promoting data downstream." },
        ]}
      />
      <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-10 text-center">
        <h2 className="text-2xl font-semibold">See the operator surfaces</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
          Six modules: command KPIs, connectors, schedules, quality, job dashboard, and warehouse.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/console" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-900">Command center</Link>
          <Link to="/docs" className="rounded-full border border-slate-600 px-5 py-2.5 text-sm">Read docs</Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
