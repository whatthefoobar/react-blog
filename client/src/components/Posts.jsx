import Post from "./Post";
// import Sidebar from "./Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  // console.log(posts);'
  // get categ here
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
    <div className="posts-and-side">
      {/* ul list with each categ mapped here */}
      <ul className="link-btns">
        <Link to={`/`} className="link ">
          <li className="sidebarListItem">All</li>
        </Link>
        {Array.isArray(cats) &&
          cats.length > 0 &&
          cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link " key={c._id}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
      </ul>
      <div className="posts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      {/* <Sidebar /> */}
    </div>
  );
};

export default Posts;
