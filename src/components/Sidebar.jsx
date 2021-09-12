import "../css/sidebar.css"

export default function Sidebar() {
    return (
        <div className="sidebar">
           <div className="sidebarItem">
               <span className="sidebarTitle">About me</span>
               <img className="sidebarImg" src="https://images.pexels.com/photos/3922074/pexels-photo-3922074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="blogger"/>
               
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ipsa, fugit rerum cumque corrupti sit.</p>
           </div>
           <div className="sidebarItem">
               <span className="sidebarTitle">Categories</span>
               <ul className="sidebarList">
                   <li className="sidebarListItem">Diy</li>
                   <li className="sidebarListItem">Tech</li>
                   <li className="sidebarListItem">Art</li>
                   <li className="sidebarListItem">Learning</li>
                   <li className="sidebarListItem">Sport</li>
                   <li className="sidebarListItem">Self improv</li>
               </ul>
           </div>
           <div className="sidebarItem">
               <span className="sidebarTitle">Follow me</span>
               <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-linkedin"></i>
                <i className="sidebarIcon fab fa-github-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
               </div>
           </div>

        </div>
    )
}
