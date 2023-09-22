import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

export default function Login() {
  const [showError, setShowError] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log("Logged in");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (err.response.status) {
        setShowError(true);
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      {showError && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Check your username and password.
        </span>
      )}
      <div className="registerOption">
        <p>Don&apos;t have an account?</p>

        <Link className="link link-hover" to="/register">
          Register here.
        </Link>
      </div>
    </div>
  );
}
