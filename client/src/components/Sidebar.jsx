import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCats = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCats(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false); // Set loading to false even on error to avoid infinite loading state
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          className="sidebarImg"
          src="https://images.pexels.com/photos/1448709/pexels-photo-1448709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="blogger"
        />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          nostrum .
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>

        {loading ? (
          <div>Loading ...</div>
        ) : (
          <ul className="sidebarList">
            {Array.isArray(cats) &&
              cats.length > 0 &&
              cats.map((c) => (
                <Link
                  to={`/?cat=${c.name}`}
                  className="link sidebar__link"
                  key={c._id}
                >
                  <li className="sidebarListItem">{c.name}</li>
                </Link>
              ))}
          </ul>
        )}
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
