import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.scss";
import App from "./App.jsx";
import { ContextProvider } from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
