import Post from './Post';
// import '../css/components/posts.css';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
