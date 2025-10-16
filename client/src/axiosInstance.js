import axios from "axios";

const REACT_APP_API_URL = "https://react-blog-1s9g.onrender.com";
//const REACT_APP_API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL || "http://localhost:5000",
});

export default axiosInstance;
