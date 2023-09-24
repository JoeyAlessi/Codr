import { useState } from "react";
import "./mainfeed.css";
import { useAppSelector } from "../../redux/store";
import { NavBar } from "./navbar";

// interface Post {
//   title: string;
//   content: string;
//   // username: string;
//   // topic_tags: string[];
// }

const MainFeed = () => {
  // const username = useAppSelector((state) => state.userState.user?.username);
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const [makePost, setMakePost] = useState(false);

 
  return (
    <div className="relative flex min-h-screen w-screen gradient-background-main">

      {/* NAVBAR COMPONENT RENDERED */}
      <NavBar
        handleSearchClick={handleSearchClick}
        setHandleSearchClick={setHandleSearchClick}
        makePost={makePost}
        setMakePost={setMakePost}
        
      />

      {/* second container with post info and scroll capability */}
      <div className="flex flex-col items-start h-screen"></div>
      {/* <div className="tab-container">
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
        <h2 className="text-white text-xl">What's on your mind, {username}?</h2>
        <div className="flex flex-col justify-between items-start mt-2">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded-lg bg-white bg-opacity-0 mr-2 mb-2 text-2xl focus:outline-none"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full p-2 rounded-lg bg-white bg-opacity-0 mr-2 focus:outline-none"
              value={input}
              onChange={handleInputChange}
            />
            <button className="post-button" onClick={handlePostClick}>
              Post
            </button>{" "}
          </div>
        </div>
      </div> 
       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-4 bg-white bg-opacity-30 rounded-lg fade-in"
          >
            <h3 className="text-white text-sm font-medium mb-2">@{username}</h3>
            <h3 className="text-white text-lg">{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div> */}
      {/* right-most column TBA */}
      <div className="flex flex-col justify-start items-start h-screen  "></div>
      {/* w-64 border-l border-gray-500 */}
    </div>
  );
};
export default MainFeed;
