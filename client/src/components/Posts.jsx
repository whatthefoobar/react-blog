import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice"; // Assuming this is your slice for categories
import Loading from "./Loading";
import Post from "./Post";

const Posts = ({ posts }) => {
  const { data: categs, isLoading, error } = useGetCategoriesQuery({});
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams();
    if (category) {
      params.set("cat", category);
    }
    params.set("page", 1); // Reset to page 1 when filtering
    navigate({ search: params.toString() });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error">Error loading categories: {error.message}</div>
    );
  }

  return (
    <div className="posts-container">
      <ul className="filter-bar link-btns">
        <li
          className="sidebarListItem link"
          onClick={() => handleCategoryClick(null)}
        >
          All
        </li>
        {Array.isArray(categs) &&
          categs.length > 0 &&
          categs.map((c) => (
            <li
              className="sidebarListItem link"
              key={c._id}
              onClick={() => handleCategoryClick(c.name)}
            >
              {c.name}
            </li>
          ))}
      </ul>
      <div className="posts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
