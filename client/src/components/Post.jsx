import '../css/post.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const publicFolder = 'http://localhost:5000/images/';
  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
        {post.photo && (
          <img
            className="postImg"
            src={publicFolder + post.photo}
            alt="blog post"
          />
        )}
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>

          <span className="postTitle">{post.title}</span>

          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          <span className="author capitalize">Writen by {post.username}</span>
        </div>

        {/* Read more btn here */}
        {/* <p className="postDesc">{post.desc}</p> */}
      </Link>
    </div>
  );
}
