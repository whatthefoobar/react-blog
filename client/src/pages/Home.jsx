import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import axiosInstance from "../axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const queryParams = new URLSearchParams(search);
  const pageFromUrl = queryParams.get("page")
    ? parseInt(queryParams.get("page"))
    : 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/posts/`
        );
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even on error to avoid infinite loading state
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const category = queryParams.get("cat");
    const filteredPosts = category
      ? posts.filter((post) => post.categories.includes(category))
      : posts;

    setFilteredPosts(filteredPosts);
    setCurrentPage(pageFromUrl); // Set to the page number from URL
  }, [search, posts, pageFromUrl, queryParams]);

  useEffect(() => {
    queryParams.set("page", currentPage);
    navigate({ search: queryParams.toString() }, { replace: true });
  }, [currentPage, navigate, queryParams]);

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
              <Posts posts={currentPosts} allPosts={posts} />
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
