import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Profile from "./pages/ProfilePage";
import PlayPage from "./pages/PlayPage";
import { Button } from "react-bootstrap";
import RulesPage from "./pages/RulesPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LogoImage from "./img/logo.jpg"
import Login from "./pages/LoginPage";

function App() {
    return (
        <Router>
        <div>
            <div className="page-header">
                <div className="logo">
                    <img className="logo-img" src={LogoImage} alt="Error"/>
                </div>
            <ul id="navigation-bar " className="nav-bar">
                <li>
                    <Link className="Link" to="home">Home</Link>
                </li>
                <li>
                    <Link className="Link" to="game">Play</Link>
                </li>
                <li>
                    <Link className="Link" to="rules">Rules</Link>
                </li>
                <li>
                    <Link className="Link" to="myprofile">Profile</Link>
                </li>
                <li>
                    <Link className="Link" to="/">Log In</Link>
                </li>
          </ul>
        </div>

        <Routes>
            <Route path="home" element={<HomePage/>} />
            <Route path="game" element={<PlayPage/>} />
            <Route path="rules" element={<RulesPage />} />
            <Route path="myprofile" element={<Profile />} />
            <Route path="/" element={<Login/>} />
            <Route path="/reg" element ={<SignUp/>} />
          {/*<Route path="rules" element = {<SignUpPage/>} />*/}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
