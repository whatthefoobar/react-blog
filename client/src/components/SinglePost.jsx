// import '../css/components/singlepost.css';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import generateRandomKey from "../util/generateRandomKey";

export default function SinglePost() {
  const { postId } = useParams();

  const [post, setPost] = useState({});
  // const publicFolder = "/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + postId);
      console.log("individual post:", res.data);
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
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected categories:", selectedCategories);
    // You can perform further actions like sending the data to a server here
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/* create update mode to picture also */}
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
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
          // need a checkbox component
          <form className="singlePostCategories" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Choose categories:</legend>
              <label>
                <input
                  type="checkbox"
                  value="music"
                  onChange={handleChange}
                  checked={selectedCategories.includes("music")}
                />
                Music
              </label>
              <label>
                <input
                  type="checkbox"
                  value="tech"
                  onChange={handleChange}
                  checked={selectedCategories.includes("tech")}
                />
                Tech
              </label>
              <label>
                <input
                  type="checkbox"
                  value="diy"
                  onChange={handleChange}
                  checked={selectedCategories.includes("diy")}
                />
                DIY
              </label>
              <label>
                <input
                  type="checkbox"
                  value="health"
                  onChange={handleChange}
                  checked={selectedCategories.includes("health")}
                />
                Health
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fashion"
                  onChange={handleChange}
                  checked={selectedCategories.includes("fashion")}
                />
                Fashion
              </label>
              <label>
                <input
                  type="checkbox"
                  value="economy"
                  onChange={handleChange}
                  checked={selectedCategories.includes("economy")}
                />
                Economy
              </label>
              <label>
                <input
                  type="checkbox"
                  value="activism"
                  onChange={handleChange}
                  checked={selectedCategories.includes("activism")}
                />
                Activism
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div className="singlePostCategories">
            {categories.map((category) => (
              <div key={generateRandomKey(10)}>{category}</div>
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
