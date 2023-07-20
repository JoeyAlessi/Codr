import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/landing-page/Home";
import { Login } from "./components/login-page/Login";
import MainFeed from "./components/main-feed/mainfeed";
import TopicSelect from "./components/topic-selection/topicselection";
import Test from "./Test";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Login />} />
        <Route path="/feed" element={<MainFeed />} />
        <Route path="/topic" element={<TopicSelect />} />
      </Routes>
    </Router>
  );
};

export default App;
