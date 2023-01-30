import Post from "./Post";
// import '../css/components/posts.css';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
