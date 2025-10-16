import { useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Context } from "../context/Context";
import CategoriesForm from "../components/CategoriesForm";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: selectedCategories,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const uploadRes = await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/api/upload`,
          data
        );
        console.log("response", uploadRes);
        const imagePath = uploadRes.data.image;
        newPost.photo = imagePath;
        console.log(newPost.photo);
      } catch (err) {
        console.log(err);
      }
    }
    console.log("new post:", newPost);
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/posts"`,
        newPost
      );
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className=" writeIcon fas fa-plus"></i>
          </label>
          {/* the image upload */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Write here..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="writeFormGroup">
          <CategoriesForm
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
