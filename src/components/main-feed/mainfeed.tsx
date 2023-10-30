import { useEffect, useState } from "react";
import "./mainfeed.css";
import { NavBar } from "./navbar";
// import { Post } from "../posts/postcard";
import { AiOutlineBell } from "react-icons/ai";
import axios from "axios";
import { useAppSelector } from "../../redux/store";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { User } from "../../services/types";
import ClipLoader from "react-spinners/ClipLoader";
import { BsCircleFill, BsThreeDots } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { Post } from "../../services/types";
import { PostComment } from "./postcomment";

const MainFeed = () => {
  const my_username = useAppSelector((state) => state.userState.user?.username);
  const my_ID = useAppSelector((state) => state.userState.user?.id);
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const [makePost, setMakePost] = useState(false);
  const [notificationsAmount, setNotificationsAmount] = useState(0);
  const [notificationUsers, setNotificationUsers] = useState<User[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLikingPost, setIsLikingPost] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentingPost, setCommentingPost] = useState<Post>();

  const likePhoto = async (post_ID: number) => {
    if (isLikingPost) {
      return;
    }
    setIsLikingPost(true);
    const originalPosts = posts ?? [];

    const post = originalPosts.find((post) => post.post_id === post_ID);
    if (!post) return; // Exit if post is not found
    const user_liked_post = post.users_liked.includes(my_ID!);

    if (user_liked_post) {
      const new_posts = originalPosts.map((post) => {
        if (post.post_id === post_ID) {
          const new_post = {
            ...post,
            likes: post.likes - 1,
            users_liked: post.users_liked.filter(
              (user_ID) => user_ID !== my_ID
            ),
          };
          return new_post;
        }
        return post;
      });
      setPosts(new_posts);
    } else {
      const new_posts = originalPosts?.map((post) => {
        if (post.post_id === post_ID) {
          const new_post = {
            ...post,
            likes: post.likes + 1,
            users_liked: [...post.users_liked, my_ID!],
          };
          return new_post;
        }
        return post;
      });
      setPosts(new_posts);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/photo/determine_like",
        {
          post_ID: post_ID,
          user_ID: my_ID,
        }
      );
      console.log("Response", response);
    } catch (error: unknown) {
      console.log("Error", error);
      // if optimistic update fails, set post state back to original
      setPosts(originalPosts);
    } finally {
      setIsLikingPost(false);
    }
  };

  const acceptFriendRequest = async (client_ID: number) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/create_friendship`,
        {
          user_one: my_ID,
          user_two: client_ID,
        }
      );

      console.log("Response", response);
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  const declineFriendRequest = async (client_ID: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/user/handle_request?my_ID=${my_ID}&client_ID=${client_ID}`
      );

      console.log("Response", response);
    } catch (error: any) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    // ADD POST FETCHING LATER ???
    // WILL IMPLEMENT WEBSOCKET HERE EVENTUALLY (FOR NOW POLLING)

    // wont run if username hasn't been fetched (slow to get from redux)

    async function fetchNotifications() {
      try {
        if (typeof my_username === "undefined") {
          return;
        }
        const response = await axios.get(
          `http://127.0.0.1:8000/api/${my_username}/notifications`
        );

        // will try to keep all response equal to usernames
        // going to have to add other response info to total notfications later
        console.log("RESPONSE", response);
        setNotificationUsers(response.data);
        setNotificationsAmount(response.data.length);
      } catch (error: any) {
        console.log("Error", error);
      }
    }
    fetchNotifications();

    // ADDED POLLING
    // const fetchNotificationsInterval = setInterval(fetchNotifications, 1000);

    // // runs when the component unmounts
    // return () => clearInterval(fetchNotificationsInterval);
  }, [my_username]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("FETCHING POSTS");
      try {
        if (typeof my_ID === "undefined") {
          return;
        }
        setIsLoading(true);

        const response = await axios.get(
          `http://127.0.0.1:8000/api/${my_ID}/fetch_posts`
        );

        setIsLoading(false);
        setPosts(response.data);
        console.log("RESPONSETWO", response);
      } catch {}
    };
    fetchPosts();
  }, [my_ID]);

  console.log("AMOUNT", notificationsAmount);
  console.log("NAME", notificationUsers);

  return (
    <div className="relative flex min-h-screen w-screen gradient-background-main">
      {isCommenting && (
        <PostComment
          setIsCommenting={setIsCommenting}
          commentingPost={commentingPost!}
          my_ID={my_ID!}
        />
      )}

      {/* NAVBAR COMPONENT RENDERED */}
      <NavBar
        handleSearchClick={handleSearchClick}
        setHandleSearchClick={setHandleSearchClick}
        makePost={makePost}
        setMakePost={setMakePost}
      />

      {/* second container with post info and scroll capability */}
      <div className="flex flex-col items-center overflow-y-auto h-screen w-4/5 pt-2 hide-scrollbar">
        <div className="flex flex-col justify-start items-center w-4/5">
          {isLoading ? (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ClipLoader
                color="#00000"
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            posts &&
            posts.map((post, index) => (
              <div
                key={index}
                style={{ height: "400px", width: "500px" }}
                className="flex flex-col bg-slate-500 rounded-lg mb-2"
              >
                {/* top bar of post */}
                <div className="flex h-1/6 w-full bg-slate-700 rounded-t-lg border-b-2 ">
                  <div className="flex justify-end items-center h-full w-1/6">
                    <BsCircleFill size={40} style={{ color: "white" }} />
                  </div>

                  <div className="flex justify-start items-center h-full w-2/3 pl-2">
                    <p style={{ fontSize: 20 }}>{post.username}</p>
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
                <div className="flex w-full h-5/6 p-4 break-all">
                  {post.content}
                </div>
                {/* bottom bar of post */}
                <div className="flex w-full h-1/6 bg-slate-700 rounded-b-lg border-t-2">
                  {/* LIKE BUTTON */}
                  <div className="flex w-16 h-full justify-center items-center ml-6 ">
                    <AiOutlineHeart
                      size={40}
                      color={
                        post.users_liked.includes(my_ID!) ? "red" : "white"
                      }
                      className="hover:cursor-pointer"
                      onClick={() => likePhoto(post.post_id)}
                      // disabled={isLinking}
                    />
                  </div>

                  {/* COMMENT BUTTON */}
                  <div className="flex w-16 h-full justify-center items-center">
                    <FaRegCommentAlt
                      size={32}
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setIsCommenting(true);
                        setCommentingPost(post);
                      }}
                    />
                  </div>

                  <div className="flex w-80 h-full justify-end items-center">
                    {`${post.likes} likes`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* right-most column */}
      <div className="flex flex-col justify-start items-start h-screen w-64 border-l border-gray-500 ">
        <div className="relative flex justify-end items-center h-14 w-full p-3">
          {notificationsAmount ? (
            <div className="absolute top-0 right-0 mt-3 mr-2 flex justify-center items-center h-5 w-5 bg-red-500 rounded-full text-sm z-10">
              {notificationsAmount}
            </div>
          ) : null}
          <AiOutlineBell
            onClick={() => {
              setShowNotifications(!showNotifications),
                console.log(showNotifications);
            }}
            className="absolute top-0 right-0 mt-5 mr-2 hover:cursor-pointer z-0"
            size={36}
          />
        </div>
        <div className="flex justify-center w-full h-4/5 rounded-lg">
          {showNotifications ? (
            <div
              className={`flex flex-col justify-start items-center w-11/12 scale-y-100  border-gray-200 translate-y-0 opacity-100 visible transition-transform duration-300 ease-out origin-top`}
            >
              {notificationsAmount ? (
                notificationUsers.map((profile, index) => (
                  <div
                    key={index}
                    className="flex flex-col mb-2 w-full h-20 rounded-xl bg-slate-400 text-black "
                  >
                    <div className="flex items-center justify-center w-full p-2 h-2/3 text-lg">
                      {`friend request from @${profile.username} `}
                    </div>
                    {/* accept or decline buttons */}
                    <div className="flex w-full h-1/3 ">
                      {/* accept button */}
                      <div
                        onClick={() => acceptFriendRequest(profile.id)}
                        className="flex hover:cursor-pointer w-1/2 h-full items-center justify-center "
                      >
                        <AiFillCheckCircle size={22} color={"green"} />{" "}
                        <p>Accept</p>
                      </div>

                      {/* decline button */}
                      <div
                        onClick={() => declineFriendRequest(profile.id)}
                        className="flex hover:cursor-pointer w-1/2 h-full items-center justify-center "
                      >
                        <AiFillCloseCircle size={22} color={"red"} />{" "}
                        <p>Decline</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="flex justify-center w-full h-10 text-white">
                  No notifications
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
      {/* w-64 border-l border-gray-500 */}
    </div>
  );
};
export default MainFeed;
