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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even on error to avoid infinite loading state
      }
    };
    fetchPosts();
  }, [search]);
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header />
      <h3 className="home__title">All blog posts</h3>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="home">
          {posts.length !== 0 && Array.isArray(currentPosts) ? (
            <>
              <Posts posts={currentPosts} />

              <Pagination
                totalPosts={posts.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          ) : (
            <p className="not-found">No posts found.</p>
          )}
        </div>
      )}
    </>
  );
}
