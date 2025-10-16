import { useEffect, useState, useMemo } from "react";
import Posts from "../components/Posts";
import axiosInstance from "../axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useLocation();
  const navigate = useNavigate();

  // Memoize queryParams to prevent unnecessary rerenders
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  // Memoize page number from URL
  const pageFromUrl = useMemo(() => {
    const page = queryParams.get("page");
    return page ? parseInt(page) : 1;
  }, [queryParams]);

  // Initialize currentPage with pageFromUrl
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  // Fetch all posts once
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get(`/api/posts/`);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on category from URL
  useEffect(() => {
    const category = queryParams.get("cat");
    const filtered = category
      ? posts.filter((post) => post.categories.includes(category))
      : posts;

    setFilteredPosts(filtered);
    setCurrentPage(pageFromUrl); // keep page in sync with URL
  }, [queryParams, posts, pageFromUrl]);

  // Sync currentPage to URL
  useEffect(() => {
    queryParams.set("page", currentPage);
    navigate({ search: queryParams.toString() }, { replace: true });
  }, [currentPage, navigate, queryParams]);

  // Pagination calculations
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
          {filteredPosts.length > 0 && Array.isArray(currentPosts) ? (
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
