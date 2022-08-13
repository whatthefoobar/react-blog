import React, { useContext } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import '../css/navbar.css';

export default function Navbar() {
  const navRef = useRef();
  const { user, dispatch } = useContext(Context);
  const publicFolder = 'http://localhost:5000/images/';

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <header>
      <div className="logo">
        LOGO
        {/* custom search bar here */}
        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>
      <nav ref={navRef} className="navbar">
        <div className="navbarCenter">
          <ul className="navbarList">
            <li className="navbarListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="navbarListItem">
              <Link className="link" to="/about">
                ABOUT
              </Link>
            </li>

            <li className="navbarListItem">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>

            <li className="navbarListItem " onClick={handleLogout}>
              {user && 'LOGOUT'}
            </li>

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
              <>
                <li className="navbarListItem">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="navbarListItem">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <i className="fa fas fa-times"></i>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <i className="fa fas fa-bars"></i>
      </button>
    </header>
  );
}
