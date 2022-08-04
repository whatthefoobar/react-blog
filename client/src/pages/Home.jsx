import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import useFetch from '../components/useFetch';

import '../css/home.css';
import HeaderImage from '../components/HeaderImage';

export default function Home() {
  // const { data: posts } = useFetch('http://localhost:8000/posts')
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
      <div className="home">
        {posts && <Posts posts={posts} />}
        {/* <Sidebar /> */}
      </div>
    </>
  );
}
