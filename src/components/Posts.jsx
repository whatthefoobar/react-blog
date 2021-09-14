// import { Link } from 'react-router-dom';
// import Post from "./Post";
import "../css/posts.css";
import Post from "./Post";

const Posts = ({posts}) => {
 
  return ( 
    <div className="posts">
    {posts.map(post => ( 
      
        <Post key={post.id} image = {post.previewImage} title = {post.title} description = {post.content} />
       
      ))}
    </div>
    
  );
}
 
export default Posts;
