import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/landing-page/Home";
import { Login } from "./components/login-page/Login";
import MainFeed from "./components/main-feed/mainfeed";
// import Profile from "./components/profile-page/profile";
import TopicSelect from "./components/topic-selection/topicselection";
import SessionManager from "./SessionManager";
import { Profile } from "./components/profile-page/Profile";

// TODO
// call useSession around Router tags b/c usage of useNavigate within useSession

const App = () => {
  return (
    <Router>
      <SessionManager>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Login />} />
          <Route path="/feed" element={<MainFeed />} />
          <Route path="/topic" element={<TopicSelect />} />
          <Route path="/profile/:client_username" element={<Profile />} />
        </Routes>
      </SessionManager>
    </Router>
  );
};

export default App;
