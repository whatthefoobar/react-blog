import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUploadUserImageMutation,
  useUpdateUserMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

export default function Settings() {
  const userDetails = useSelector((state) => state.auth.userInfo);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [uploadUserImage] = useUploadUserImageMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(userDetails?.username || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const imgSrc = file ? URL.createObjectURL(file) : `${userDetails.image}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedUser = {
      userId: userDetails._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      // do not assign name to file here as it interferes with multer's name assigning before pushing the file to db
      data.append("file", file);
      // console.log("FormData contents:", data.get("file"));
      try {
        const response = await uploadUserImage(data).unwrap(); // Use the redux hook for uploading the image
        updatedUser.image = response.image;
      } catch (uploadError) {
        toast.error(uploadError.data?.message || uploadError.error);
        console.error("File upload failed:", uploadError);
        return; // Exit if file upload fails
      }
    }
    // console.log("Updated User Payload:", updatedUser); // Debug log
    try {
      const res = await updateUser(updatedUser).unwrap();
      dispatch(setCredentials(res)); // Update Redux state with new user info
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={imgSrc} alt="Profile" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                console.log("Selected file:", e.target.files[0]);
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={userDetails?.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={userDetails?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit" disabled={isLoading}>
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
