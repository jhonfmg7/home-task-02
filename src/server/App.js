import { hydrate } from "react-dom";
import App from "../App.tsx";

const MyApp = hydrate(App, document.getElementById('app'));

export default MyApp;