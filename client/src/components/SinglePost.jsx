// import '../css/components/singlepost.css';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

export default function SinglePost() {
  const { postId } = useParams();

  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      console.log(res);
      // we have a res.data.categories array
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
    };
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link capitalize">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode ? (
          // ne a checkbox component
          <form className="singlePostCategories">
            <label htmlFor="ategory">Choose a category:</label>
            <select name="category" id="cars">
              <option value="music">music</option>
              <option value="tech">tech</option>
              <option value="diy">diy</option>
              <option value="health">health</option>
              <option value="fashion">fashion</option>
              <option value="economy">economy</option>
              <option value="factivism">activism</option>
              <button type="submit">Submit</button>
            </select>
          </form>
        ) : (
          <div className="singlePostCategories">
            {categories.map((category) => (
              <>
                <span key={category._id}>{category}</span>{" "}
              </>
            ))}
          </div>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
