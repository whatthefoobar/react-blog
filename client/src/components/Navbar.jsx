import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const { user, dispatch } = useContext(Context);
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

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
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
              {user && <p className="logout">Logout</p>}
            </li>
            {user ? (
              <Link to="/settings" className="link">
                <img
                  className="topImg"
                  src={
                    user.profilePic
                      ? user.profilePic
                      : "/images/defaultUserImg.jpg"
                  }
                  alt="user profile"
                />
                <span className="capitalize">{user.username}</span>
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
