import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
// import '../css/components/navbar.css';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
  const navRef = useRef();
  const { user, dispatch } = useContext(Context);
  const publicFolder = 'http://localhost:5000/images/';
  //
  const navigate = useNavigate();
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
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__content">
        <Link to="/" className="nav-bar__content__logo">
          Logo
        </Link>
        <nav
          className={`nav-bar__content__nav ${
            menuOpen && size.width < 768 ? 'isMenu' : ''
          }`}
        >
          <ul className="center-section">
            <li>
              <Link to="/" onClick={menuToggleHandler}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={menuToggleHandler}>
                About
              </Link>
            </li>
            <li>
              <Link to="/write" onClick={menuToggleHandler}>
                Write
              </Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              {user && (
                <p onClick={menuToggleHandler} className="logout">
                  Logout
                </p>
              )}
            </li>
          </ul>

          <ul className="right-section">
            {user ? (
              <Link to="/settings" className="link">
                <img
                  className="topImg"
                  src={
                    user.profilePic
                      ? publicFolder + user.profilePic
                      : 'https://images.pexels.com/photos/4132327/pexels-photo-4132327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  }
                  alt="user profile"
                />
                <span className="capitalize">{user.username}</span>
              </Link>
            ) : (
              <li>
                <Link to="/login" onClick={menuToggleHandler}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="nav-bar__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </nav>
  );
}
