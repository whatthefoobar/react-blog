import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default App;

// import Home from "../src/pages/Home";
// import Single from "../src/pages/Single";
// import Write from "../src/pages/Write";
// import Settings from "../src/pages/Settings";
// import Login from "../src/pages/Login";
// import Register from "../src/pages/Register";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from "./pages/About";
// import { useContext } from "react";
// import { Context } from "./context/Context.js";
// import Navbar from "./components/Navbar";
// import NotFound from "./pages/NotFound.jsx";

// function App() {
//   const { user } = useContext(Context);
//   // console.log("user from context", user);
//   //   {
//   //     "_id": "66840031bfe9a165059b352f",
//   //     "username": "john",
//   //     "email": "john@example.com",
//   //     "isAdmin": false
//   // }

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/register" element={user ? <Home /> : <Register />} />{" "}
//         {/* if there's a user go to home else to register */}
//         <Route path="/login" element={user ? <Home /> : <Login />} />
//         <Route path="/write" element={user ? <Write /> : <Login />} />
//         <Route path="/settings" element={user ? <Settings /> : <Register />} />
//         <Route path="/post/:postId" element={<Single />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
