import App from "./components/Application/index.tsx";
import { createRoot } from "react-dom/client";
import "@src/domains/Theme/style.css";

createRoot(document.getElementById("root")!).render(<App />);
