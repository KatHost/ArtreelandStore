import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "./styles/variables.css";
import "./styles/app.css";
import "./styles/hero.css";
import "./styles/product.css";
import "./styles/shop.css";
import "./styles/footer.css";
import "./styles/pagination.css";
import "./App.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);  