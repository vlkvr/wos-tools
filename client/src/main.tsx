import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Safely render the app only in browser environment
if (typeof document !== "undefined" && document.getElementById) {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
}
