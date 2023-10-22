import { useEffect, useState } from "react";
import "./mainfeed.css";
import { useAppSelector } from "../../redux/store";
import { NavBar } from "./navbar";
import axios from "axios";
import { Post } from "../posts/postcard";

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
  const [posts, setPosts] = useState<Post[]>([]);

  // const handleTabClick = (tab: React.SetStateAction<string>) => {
  //   setActiveTab(tab);
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInput(event.target.value);
  // };

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  // useEffect(() => {
  //   // useEffect only takes sync functions, so have to create sync and call func inside useEffect
  //   async function checkSession() {
  //     try {
  //       // automatically will send token in post request
  //       const response = await axios.post(
  //         "http://127.0.0.1:8000/api/fetch-posts",
  //         {},
  //         // needs with credentials to send http only cookies
  //         { withCredentials: true }
  //       );
  //       // if user cookie exists and is valid, populate redux with cookie info and send to feed page
  //       console.log("RESPONSE", response);
  //       const userInfo: User = {
  //         id: response.data.User.id,
  //         username: response.data.User.username,
  //         email: response.data.User.email,
  //       };

  //       dispatch({ type: UserActions.Login, payload: { user: userInfo } });

  //       navigate("/feed");
  //     } catch (error: any) {
  //       //. if no cookie exists, user must sign in manually
  //       console.log("ERROR", error);
  //       console.error(error.response.data.Error);
  //       navigate("/sign");
  //     }
  //   }
  //   checkSession();
  // }, []);

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
      <div className="flex flex-col items-center overflow-y-auto h-screen w-4/5">
        <div className="flex flex-col items-center w-4/5 h-full "></div>
      </div>

      {/* right-most column TBA */}
      <div className="flex flex-col justify-start items-start h-screen w-64 border-l border-gray-500 "></div>
      {/* w-64 border-l border-gray-500 */}
    </div>
  );
};
export default MainFeed;
