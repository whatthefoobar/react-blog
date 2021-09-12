import Home from "../src/pages/Home";
import TopBar from "./components/TopBar";
import Single from "../src/pages/Single";
import Write from "../src/pages/Write";
import Settings from "../src/pages/Settings";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const user = false; /*for testing purposes*/
  return (
    <Router>
      <TopBar/>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/register">
           { user? <Home/> : <Register/>} 
           {/* if there's a user go to home else to register */}
        </Route>
        <Route path="/login">
          { user? <Home/> : <Login/>} 
        </Route>
        <Route path="/write">
          { user? <Write/> : <Register/>} 
        </Route>
        <Route path="/settings">
          { user? <Settings/> : <Register/>} 
        </Route>
        <Route path="/post/:postId">
            <Single/>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
