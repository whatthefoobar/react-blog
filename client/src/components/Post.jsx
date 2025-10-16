import { Link } from "react-router-dom";
import generateRandomKey from "../util/generateRandomKey"; // not pretty but it'll do for now
import axiosInstance from "../axiosInstance";

export default function Post({ post }) {
  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        {post.photo && (
          <img
            className="postImg"
            src={`${axiosInstance.defaults.baseURL}${post.photo}`}
            alt="blog post"
          />
        )}
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((c, index) => (
              <span key={generateRandomKey(10)} className="postCat">
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
        <div className="categoryWrapper">
          <div>Tags:</div>
          <div className="postCategories">
            {post.categories.map((category, index) => (
              <p key={index} className="postCategory">
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
