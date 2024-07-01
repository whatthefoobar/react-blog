import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { search } = useLocation(); // ?page=1 , ?cat=fashion, ?cat=economy&page=2
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const queryParams = new URLSearchParams(search); // shows how many params if category and page shows 2

  const pageFromUrl = queryParams.get("page")
    ? parseInt(queryParams.get("page"))
    : 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even on error to avoid infinite loading state
      }
    };
    fetchPosts();
  }, []);

  // if there is a category filter posts by it
  //q params set by Link to={`/?cat=${c.name}`} of the buttons
  useEffect(() => {
    const category = queryParams.get("cat");
    const filteredPosts = category
      ? posts.filter((post) => post.categories.includes(category))
      : posts;

    setFilteredPosts(filteredPosts);
    setCurrentPage(pageFromUrl); // Set to the page number from URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, posts]);

  useEffect(() => {
    queryParams.set("page", currentPage);
    navigate({ search: queryParams.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, navigate]);

  const postsPerPage = 8;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header />
      <h3 className="home__title">All blog posts</h3>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="home">
          {filteredPosts.length !== 0 && Array.isArray(currentPosts) ? (
            <>
              <Posts posts={currentPosts} />
              <Pagination
                totalPosts={filteredPosts.length}
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
