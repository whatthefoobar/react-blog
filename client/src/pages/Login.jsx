import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const userRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // post to /api/users
      const res = await login({
        username: userRef.current.value,
        password: passwordRef.current.value,
      }).unwrap();
      //set to local storage
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
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
        <button disabled={isLoading} className="loginButton" type="submit">
          Login
        </button>
      </form>
      <div className="registerOption">
        <p>Don&apos;t have an account?</p>

        <Link
          className="link link-hover"
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
        >
          Register here.
        </Link>
      </div>
    </div>
  );
}
