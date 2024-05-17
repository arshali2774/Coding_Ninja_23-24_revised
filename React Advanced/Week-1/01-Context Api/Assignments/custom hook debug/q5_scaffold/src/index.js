import { createRoot } from "react-dom/client";

import App from "./AppRoot";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
