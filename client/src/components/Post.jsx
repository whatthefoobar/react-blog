// import '../css/components/post.css';
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const publicFolder = "http://localhost:5000/images/";

  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
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
              <span className="postCat" key={c._id}>
                {c.name}
              </span>
            ))}
          </div>

          <span className="postTitle">{post.title}</span>
          <div className="subTitle">
            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
            <span className="author capitalize">Writen by {post.username}</span>
          </div>
        </div>

        <p className="postDesc">{post.desc}</p>
      </div>
    </Link>
  );
}
