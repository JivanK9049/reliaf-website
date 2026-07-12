import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

import "./index.css";
import App from "./App.jsx";
import LeadershipPage from "./LeadershipPage";
import ProductQuality from "./pages/ProductQuality";
import ManufacturingQuality from "./pages/ManufacturingQuality";
import FarmerResults from "./pages/FarmerResults";
import QualityCertifications from "./pages/QualityCertifications";
import LabTesting from "./pages/LabTesting";
import PrivacyPolicy from "./PrivacyPolicy";
import Careers from "./pages/Careers";
import AdminOrders from "./AdminOrders";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import Dealership from "./pages/Dealership";
import ContactPage from "./pages/ContactPage";
import ProductPage from "./pages/ProductPage";
import FarmerDemo from "./pages/FarmerDemo";

AOS.init({
  duration: 1000,
  once: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
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
        
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
