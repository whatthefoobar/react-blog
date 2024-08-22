import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.scss";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store.jsx";

import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="write" element={<Write />} />
      <Route path="settings" element={<Settings />} />
      <Route path="post/:postId" element={<Single />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="register" element={user ? <Home /> : <Register />} /> */}
      {/* <Route path="login" element={user ? <Home /> : <Login />} /> */}
      {/* <Route path="write" element={user ? <Write /> : <Login />} /> */}
      {/* <Route path="settings" element={user ? <Settings /> : <Register />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./css/index.scss";
// import App from "./App.jsx";
// import { ContextProvider } from "./context/Context";
// import { Provider } from "react-redux";
// import store from "./Store.jsx";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <ContextProvider>
//       <App />
//     </ContextProvider>
//   </Provider>
// );
