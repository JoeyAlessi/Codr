import "./Profile.css";
import { useEffect, useState } from "react";
import { NavBar } from "../main-feed/navbar";
import { BsCircleFill, BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { UserActions } from "../../redux/reducers/user";
import ClipLoader from "react-spinners/ClipLoader";
import { User, Post } from "../../services/types";
import { SearchFriends } from "./searchFriends";
import { RenderPosts } from "./renderPosts";

export const Profile = () => {
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const [makePost, setMakePost] = useState(false);
  const [clientProfileData, setClientProfileData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [myProfile, setMyProfile] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friendCount, setFriendCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [checkFriends, setCheckFriends] = useState(false);
  const [checkPosts, setCheckPosts] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentingPost, setCommentingPost] = useState<Post>();

  const navBarWidth = 64; // used for calculations regarding outside divs
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const my_username = useAppSelector((state) => state.userState.user?.username);
  const my_ID = useAppSelector((state) => state.userState.user?.id);
  const { client_username } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("FETCHING USER PROFILE");
      try {
        setIsLoading(true);
        if (typeof my_username === "undefined") {
          return;
        }
        const response = await axios.get(
          `http://127.0.0.1:8000/user/${client_username}/${my_username}`
        );

        setClientProfileData(response.data.user);
        setSentRequest(response.data.i_sent_request);
        setIsFriend(response.data.isFriend);
        setMyProfile(response.data.myAccount);

        // if its my account this will exist
        if (response.data.myAccount) {
          setFriendCount(response.data.myFollowerCount);
          setPostCount(response.data.myPostCount);
          setPosts(response.data.myPosts);
        } else {
          setFriendCount(response.data.clientFollowerCount);
          setPostCount(response.data.clientPostCount);
          setPosts(response.data.clientPosts);
        }
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error:", error);
      }
    };

    fetchUserProfile();
  }, [client_username, my_username]);

  const sendFriendRequest = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/user/handle_request?my_ID=${my_ID}&client_ID=${clientProfileData?.id}`,
        {
          from_id: my_ID,
          to_id: clientProfileData?.id,
        }
      );
      console.log("Response", response);
      setSentRequest(!sentRequest);
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  const removeFriendRequest = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/handle_request${my_ID}/${clientProfileData?.id}`
      );
      console.log("Response", response);
      setSentRequest(!sentRequest);
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  const logoutUser = async () => {
    // logic only for logged in user
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        { username: my_username },
        { withCredentials: true }
      );
      navigate("/sign");
      console.log("Response", response.data);
      dispatch({ type: UserActions.Logout });
      console.log("User Logged Out");
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex relative min-h-screen w-screen gradient-background-main">
      <SearchFriends
        checkFriends={checkFriends}
        setCheckFriends={setCheckFriends}
      />

      <RenderPosts
        checkPosts={checkPosts}
        setCheckPosts={setCheckPosts}
        posts={posts}
        username={myProfile ? my_username : client_username}
        isCommenting={isCommenting}
        setIsCommenting={setIsCommenting}
        commentingPost={commentingPost!}
        setCommentingPost={setCommentingPost}
      />
      <NavBar
        handleSearchClick={handleSearchClick}
        setHandleSearchClick={setHandleSearchClick}
        makePost={makePost}
        setMakePost={setMakePost}
      />

      {/* placeholder for fixed navbar */}

      {/* turnary statement to render transparent div */}
      {/* add isLoading and isYourPage functionality */}

      {/* div holding account page styling */}
      <div
        style={{ width: `calc(100% - ${navBarWidth}px)` }}
        className="flex justify-center items-center "
      >
        {isLoading ? (
          <div className="flex w-95-percent h-90-percent justify-center items-center rounded-2xl bg-gray-600 ">
            {/* loading screen elements */}
            <ClipLoader
              color="#00000"
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="flex flex-col w-95-percent h-90-percent rounded-2xl bg-gray-600 ">
            <div className="flex flex-row h-1/4 w-full rounded-2xl justify-center">
              <div className="flex w-3/4 h-full">
                <div className="flex w-1/3 h-full justify-center items-center">
                  <BsCircleFill size={140} style={{ color: "white" }} />
                </div>

                <div className="flex flex-col w-2/3 h-full pt-8 ">
                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "18px",
                      color: "white",
                    }}
                    className="flex flex-row h-1/5 w-full "
                  >
                    {/* USERNAME DIV */}
                    <div
                      style={{
                        fontSize: "22px",
                      }}
                      className="w-1/4 flex justify-center"
                    >
                      {/* render username here */}
                      {clientProfileData?.username}
                    </div>

                    <div className="w-4/5 flex justify-evenly">
                      {myProfile ? (
                        <>
                          <button
                            style={{
                              backgroundColor: "gray",
                              fontFamily: "Verdana",
                              fontSize: "18px",
                              color: "white",
                            }}
                            className="flex items-center"
                          >
                            Edit Account
                          </button>

                          <button
                            onClick={() => {
                              logoutUser();
                            }}
                            style={{
                              backgroundColor: "red",
                              fontFamily: "Verdana",
                              fontSize: "18px",
                              color: "white",
                            }}
                            className="flex items-center"
                          >
                            Log Out
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-row h-1/5 w-full "></div>

                  <div
                    style={{
                      fontFamily: "Verdana",
                      fontSize: "18px",
                      color: "white",
                    }}
                    className="flex flex-row h-1/5 w-full "
                  >
                    {/* ACCOUNT INFO DIV */}

                    <div className="w-1/5 flex justify-center">
                      <div
                        onClick={() => setCheckPosts(true)}
                        className="hover:cursor-pointer"
                      >
                        {`${postCount} Posts`}
                      </div>
                    </div>

                    <div className="w-2/5 flex justify-center ">
                      <div
                        onClick={() => setCheckFriends(true)}
                        className="hover:cursor-pointer"
                      >
                        {`${friendCount} Friends`}
                      </div>
                    </div>
                  </div>

                  {/* buttons for following and unfollowing */}
                  <div className="flex flex-row h-1/5 w-full">
                    {myProfile ? null : isFriend ? (
                      <div
                        style={{
                          backgroundColor: "gray",
                          fontFamily: "Verdana",
                          fontSize: "18px",
                          color: "white",
                        }}
                        className="flex items-center justify-center h-full w-32 rounded-md"
                      >
                        Following
                      </div>
                    ) : sentRequest ? (
                      <button
                        onClick={() => removeFriendRequest()}
                        style={{
                          backgroundColor: "gray",
                          fontFamily: "Verdana",
                          fontSize: "18px",
                          color: "white",
                        }}
                        className="flex items-center"
                      >
                        Request Sent
                      </button>
                    ) : (
                      <button
                        onClick={() => sendFriendRequest()}
                        style={{
                          backgroundColor: "gray",
                          fontFamily: "Verdana",
                          fontSize: "18px",
                          color: "white",
                        }}
                        className="flex items-center"
                      >
                        Send Follow Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-4/5 w-full flex-wrap ">
              {posts.slice(0, 6).map((post, index) => (
                <div
                  onClick={() => {
                    setIsCommenting(true);
                    setCommentingPost(post);
                    setCheckPosts(false);
                  }}
                  key={index}
                  style={{
                    height: handleSearchClick ? "270px" : "300px",
                    width: handleSearchClick ? "341px" : "390px",
                  }}
                  className="flex flex-col bg-slate-500 rounded-lg m-2 hover:cursor-pointer"
                >
                  {/* top bar of post */}
                  <div className="flex h-1/6 w-full bg-slate-700 rounded-t-lg border-b-2 ">
                    <div className="flex justify-end items-center h-full w-1/6">
                      <BsCircleFill size={20} style={{ color: "white" }} />
                    </div>

                    <div className="flex justify-start items-center h-full w-2/3 pl-2">
                      <p style={{ fontSize: 12 }}>{post.username}</p>
                    </div>

                    <div className="flex justify-center items-center h-full w-1/6 ">
                      <BsThreeDots
                        size={32}
                        style={{ color: "white" }}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* post content rendered here */}
                  <div
                    style={{ fontSize: 16 }}
                    className="flex w-full h-5/6 p-4 break-all"
                  >
                    {post.content}
                  </div>
                  {/* bottom bar of post */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
