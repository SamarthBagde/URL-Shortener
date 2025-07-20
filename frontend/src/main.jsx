import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
