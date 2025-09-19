import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LandingPage } from "./screens/LandingPage/LandingPage";
import "./styles/mobile.css";

const container = document.getElementById("app");
if (!container) throw new Error("Root container #app not found");
createRoot(container).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>
);
