import { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../css/home.css';
import HeaderImage from '../components/HeaderImage';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);

      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <HeaderImage />
      <div className="home">{posts && <Posts posts={posts} />}</div>
    </>
  );
}
