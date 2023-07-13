import React, { useState } from "react";
import "./mainfeed.css";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import { useNavigate } from "react-router-dom";

const MainFeed = () => {
  const [activeTab, setActiveTab] = useState("For You");
  const navigate = useNavigate();

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen w-screen gradient-background-main">
      <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img
          src={EmptyLogo}
          alt="Logo"
          className="absolute top-0 left-0 m-2 h-8 lg:h-[10vh]"
        />
      </div>
      <div className="tab-container">
        <div
          className={`tab-item ${activeTab === "For You" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("For You")}
        >
          <div className="underline-custom">For You</div>
        </div>
        <div
          className={`tab-item ${activeTab === "Explore" ? "tab-active" : ""}`}
          onClick={() => handleTabClick("Explore")}
        >
          <div className="underline-custom">Explore</div>
        </div>
      </div>
      <div className="mt-6 bg-white bg-opacity-20 rounded-lg w-10/12 md:w-7/12 lg:w-5/12 p-4">
        <h2 className="text-white text-xl">What's on your mind?</h2>
        <div className="flex justify-between items-center mt-2">
          <input 
            type="text" 
            placeholder="Ask a CS Related Question" 
            className="w-full p-2 rounded-lg bg-white bg-opacity-30 mr-2" 
          />
          <button className="post-button">Post</button>
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
