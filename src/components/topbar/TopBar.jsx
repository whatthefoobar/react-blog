import "./topbar.css"

export default function TopBar() {
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
                    <li className="topListItem">Home</li>
                    <li className="topListItem">About</li>
                    <li className="topListItem">Contact</li>
                    <li className="topListItem">Write</li>
                    <li className="topListItem">Login</li>
                    <li className="topListItem">Register</li>
                </ul>
            </div>
            <div className="topRight">
                <img className="topImg" src="https://images.pexels.com/photos/3922074/pexels-photo-3922074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />

                <i className="topSearchIcon fas fa-search"></i>

            </div>
        </div>
    )
}
