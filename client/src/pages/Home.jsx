import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);

      setPosts(res.data);
      // setLoading(false);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="home">{posts && <Posts posts={posts} />}</div>
      )}
    </>
  );
}
