import { useState } from "react";
import "./App.css";
import Hand from "./assets/ai-nuclear-energy-background-future-innovation-disruptive-technology-removebg.png"
const App = () => {
  return (
    <div className="App">
      <h1 className="text">codr.</h1>
      <img src = {Hand} className="handIMG"/>
    </div>
  );
};

export default App;