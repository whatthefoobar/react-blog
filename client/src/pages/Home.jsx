import Header from "../components/Header"
import Posts from "../components/Posts"
import Sidebar from "../components/Sidebar"
import useFetch from "../components/useFetch"

import "../css/home.css"

export default function Home() {
  const { data: posts } = useFetch('http://localhost:8000/posts')
    return (
        <>
          <Header/> 
          <div className="home">
             { posts && <Posts posts={posts} /> }
             <Sidebar/>
          </div>
        </>
    )
}
