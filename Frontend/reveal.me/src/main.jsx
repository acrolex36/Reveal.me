import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
 <CookiesProvider>
    <App/>
  {/* </React.StrictMode> */}
 </CookiesProvider>
);
