import Home from '../src/pages/Home';
import TopBar from './components/TopBar';
import Single from '../src/pages/Single';
import Write from '../src/pages/Write';
import Settings from '../src/pages/Settings';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';

function App() {
  const user = true; /*for testing purposes*/
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />{' '}
        {/* if there's a user go to home else to register */}
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
