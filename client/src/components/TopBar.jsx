import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import '../css/topbar.css';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const linkStyle = { textDecoration: 'none', color: 'inherit' };
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="top">
      <div className="topLeft">
        {/* custom search bar here */}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && 'LOGOUT'}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings" className="link">
            <img className="topImg" src={user.profilePic} alt="" />
            <span className="capitalize">{user.username}</span>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
