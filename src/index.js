import React from "react";
import { createRoot } from 'react-dom/client';

// Component
import App from "./App";

// Css
import "./App.css";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App />);