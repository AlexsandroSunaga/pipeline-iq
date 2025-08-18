import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "@/components/Shell";

const Dashboard = lazy(() => import("@/views/ops/dashboard"));
const Command = lazy(() => import("@/views/console/command"));
const Connectors = lazy(() => import("@/views/console/connectors"));
const Schedules = lazy(() => import("@/views/console/schedules"));
const Quality = lazy(() => import("@/views/console/quality"));
const Records = lazy(() => import("@/views/records"));
const Jobs = lazy(() => import("@/views/console/jobs"));
const Destinations = lazy(() => import("@/pages/DestinationsPage/DestinationsPage"));

export default function OpsShell() {
  return (
    <Shell>
      <Routes>
        <Route path="/ops" element={<Dashboard />} />
        <Route path="/console" element={<Command />} />
        <Route path="/console/connectors" element={<Connectors />} />
        <Route path="/console/schedules" element={<Schedules />} />
        <Route path="/console/quality" element={<Quality />} />
        <Route path="/console/jobs" element={<Jobs />} />
        <Route path="/console/destinations" element={<Destinations />} />
        <Route path="/records" element={<Records />} />
        <Route path="*" element={<Navigate to="/ops" replace />} />
      </Routes>
    </Shell>
  );
}
