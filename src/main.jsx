import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.jsx";
const LeadershipPage = lazy(() => import("./LeadershipPage"));
const ProductQuality = lazy(() => import("./pages/ProductQuality"));
const ManufacturingQuality = lazy(() => import("./pages/ManufacturingQuality"));
const FarmerResults = lazy(() => import("./pages/FarmerResults"));
const QualityCertifications = lazy(() => import("./pages/QualityCertifications"));
const LabTesting = lazy(() => import("./pages/LabTesting"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const Careers = lazy(() => import("./pages/Careers"));
const AdminOrders = lazy(() => import("./AdminOrders"));
const AdminLogin = lazy(() => import("./AdminLogin"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Dealership = lazy(() => import("./pages/Dealership"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const FarmerDemo = lazy(() => import("./pages/FarmerDemo"));
const LuckyDrawCoupon = lazy(() => import("./pages/LuckyDrawCoupon"));
const EmployeeTracking = lazy(() => import("./pages/EmployeeTracking"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));
const EmployeePortal = lazy(() => import("./pages/EmployeePortal"));
const TrackingAdmin = lazy(() => import("./pages/TrackingAdmin"));

// Animation code is intentionally deferred so it cannot delay the first paint.
// Pages still opt into AOS with their data-aos attributes once the browser is idle.
const startAnimations = () => {
  import("aos").then(({ default: AOS }) => {
    import("aos/dist/aos.css").then(() => AOS.init({ duration: 700, once: true }));
  });
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(startAnimations, { timeout: 3000 });
} else {
  window.setTimeout(startAnimations, 1500);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="grid min-h-screen place-items-center bg-green-50 font-semibold text-green-800">Loading Reliaf…</div>}>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quality/product-quality" element={<ProductQuality />} />
        <Route path="/quality/manufacturing" element={<ManufacturingQuality />} />
        <Route path="/quality/farmer-results" element={<FarmerResults />} />
        <Route path="/quality/certifications" element={<QualityCertifications />} /> 
        <Route path="/quality/lab-testing" element={<LabTesting />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/admin/reliaf-dashboard" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dealership" element={<Dealership />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/farmer-demo" element={<FarmerDemo />} />
        <Route path="/lucky-draw-coupon" element={<ProtectedRoute><LuckyDrawCoupon /></ProtectedRoute>} />
        <Route path="/employee-tracking" element={<EmployeeTracking />} />
        <Route path="/employee-tracking/login" element={<EmployeeLogin />} />
        <Route path="/employee-tracking/admin-login" element={<EmployeeLogin admin />} />
        <Route path="/employee-tracking/employee" element={<EmployeePortal />} />
        <Route path="/employee-tracking/admin" element={<TrackingAdmin />} />
        
        </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
