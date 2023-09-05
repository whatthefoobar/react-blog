import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);

      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <h3 className="home__title">All blog posts</h3>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <>
          <div className="home">
            {currentPosts && <Posts posts={currentPosts} />}
          </div>
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
}
