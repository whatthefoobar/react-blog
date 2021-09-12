import { Link } from "react-router-dom";
import "../css/topbar.css";

export default function TopBar() {
    const user = false;
    const linkStyle= {textDecoration: "none", color:"inherit"};
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-linkedin"></i>
                <i className="topIcon fab fa-github-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" style={linkStyle}>Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/about" style={linkStyle}>About</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/contact" style={linkStyle}>Contact</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" style={linkStyle}>Write</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/login" style={linkStyle}>{user && "Logout"}</Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                { user ? (
                  <img className="topImg" src="https://images.pexels.com/photos/3922074/pexels-photo-3922074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                ) : 
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/login" style={linkStyle}>Login</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </li>
                    
                </ul>
                }
                

                <i className="topSearchIcon fas fa-search"></i>

            </div>
        </div>
    )
}
