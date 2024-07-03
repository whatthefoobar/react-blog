import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.scss";
import App from "./App.jsx";
import { ContextProvider } from "./context/Context";
import { Provider } from "react-redux";
import store from "./Store.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>
);
