import { hydrateRoot } from "react-dom/server";

// import App from "../App.tsx";
import Component from "./Component.js";

const container = document.getElementById("app");
const root = hydrateRoot(container);

const MyApp = root.render(<Component />);

export default MyApp;