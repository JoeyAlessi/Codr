import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/landing-page/Home";
import { RegisterLogin } from "./components/register-login/RegisterLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign" element={<RegisterLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
