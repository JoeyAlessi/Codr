import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/landing-page/Home";
import { RegisterLogin } from "./components/register-login/RegisterLogin";
import MainFeed from "./components/main-feed/mainfeed";
import TopicSelect from "./components/topic-selection/topicselection";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<RegisterLogin />} />
        <Route path="/feed" element={<MainFeed />} />
        <Route path="/topic" element={<TopicSelect />} />
      </Routes>
    </Router>
  );
};

export default App;
