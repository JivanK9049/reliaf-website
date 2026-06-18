import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import LeadershipPage from "./LeadershipPage.jsx";
import QualityPolicy from "./QualityPolicy.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quality-policy" element={<QualityPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/leadership" element={<LeadershipPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);