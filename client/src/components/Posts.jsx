import Post from "./Post";
import Sidebar from "./Sidebar";

const Posts = ({ posts }) => {
  // console.log(posts);
  return (
    <div className="posts-and-side">
      <div className="posts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <Sidebar />
    </div>
  );
};

export default Posts;
