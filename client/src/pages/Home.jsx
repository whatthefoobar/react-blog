import { useEffect, useState, useMemo } from "react";
import Posts from "../components/Posts";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { useGetPostsQuery } from "../slices/postsApiSlice";

export default function Home() {
  const { data: blogPosts, isLoading, error } = useGetPostsQuery({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const pageFromUrl = queryParams.get("page")
    ? parseInt(queryParams.get("page"))
    : 1;
  const categoryFromUrl = queryParams.get("cat");
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    if (blogPosts) {
      const filteredPosts = categoryFromUrl
        ? blogPosts.filter((post) => post.categories.includes(categoryFromUrl))
        : blogPosts;

      setFilteredPosts(filteredPosts);
    }
  }, [search, blogPosts, queryParams, categoryFromUrl]);

  useEffect(() => {
    if (currentPage !== pageFromUrl) {
      queryParams.set("page", currentPage);
      navigate({ search: queryParams.toString() }, { replace: true });
    }
  }, [currentPage, pageFromUrl, navigate, queryParams]);

  // Reset currentPage to 1 when the category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFromUrl]);

  const postsPerPage = 8;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header />
      <h3 className="home__title">All blog posts</h3>
      {isLoading ? (
        <div className="loading">Loading posts...</div>
      ) : error ? (
        <div className="error">Error loading posts: {error.message}</div>
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
