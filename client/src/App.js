// import 'bootstrap/scss/bootstrap.scss';
// from our node_modules
import Home from '../src/pages/Home';
import Single from '../src/pages/Single';
import Write from '../src/pages/Write';
import Settings from '../src/pages/Settings';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import { useContext } from 'react';
import { Context } from './context/Context';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      {/* <TopBar /> */}
      {/* testing out a navbar ui */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />{' '}
        {/* if there's a user go to home else to register */}
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
