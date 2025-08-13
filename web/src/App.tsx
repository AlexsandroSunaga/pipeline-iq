import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Landing = lazy(() => import("@/pages/LandingPage/LandingPage"));
const Trust = lazy(() => import("@/pages/TrustCenterPage/TrustCenterPage"));
const Catalog = lazy(() => import("@/pages/ConnectorCatalogPage/ConnectorCatalogPage"));
const Features = lazy(() => import("@/views/features"));
const Solutions = lazy(() => import("@/views/solutions"));
const Integrations = lazy(() => import("@/views/integrations"));
const Docs = lazy(() => import("@/views/docs"));
const Status = lazy(() => import("@/views/status"));
const OpsShell = lazy(() => import("@/router/OpsShell"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-slate-400">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/status" element={<Status />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/*" element={<OpsShell />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
