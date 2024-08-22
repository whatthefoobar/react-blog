import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

export default function Navbar() {
  const userDetails = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // const { user, dispatch } = useContext(Context);
  // const publicFolder = "/images/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 900 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const handleLogout = async () => {
    //rewrite this
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__content">
        <Link to="/" className="nav-bar__content__logo">
          No Planet B
        </Link>
        <nav
          className={`nav-bar__content__nav ${
            menuOpen && size.width < 900 ? "menuOpen" : ""
          }`}
        >
          <ul onClick={menuToggleHandler}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              {userDetails && <p className="logout">Logout</p>}
            </li>
            {userDetails ? (
              <Link to="/settings" className="link">
                <img
                  className="topImg"
                  src={
                    userDetails.image
                      ? `${userDetails.image}`
                      : "/images/defaultUserImg.jpg"
                  }
                  alt="user profile"
                />
                <span className="capitalize">{userDetails.username}</span>
              </Link>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        {/* Nav btn on small screen */}
        <div className="nav-bar__content__toggle" onClick={menuToggleHandler}>
          {!menuOpen ? <BiMenuAltRight /> : <AiOutlineClose />}
        </div>
      </div>
    </nav>
  );
}
