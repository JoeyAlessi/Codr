import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsCircleFill, BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export type Post = {
  user_id: number | undefined;
  // post_id: number;
  // title: string;
  content: string;
};

type PostCardProps = {
  makePost: boolean;
  setMakePost: Dispatch<SetStateAction<boolean>>;
};

export const PostCard = ({ makePost, setMakePost }: PostCardProps) => {
  const username = useAppSelector((state) => state.userState.user?.username);
  const id = useAppSelector((state) => state.userState.user?.id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [placeholder, setActivePlaceholder] = useState(
    "Ask anything about computer science..."
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  // NEED TO IMPLEMENT LATER
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePostClick = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/post", {
        username: username,
        user_id: id,
        // title: title, //objects sending to postgres db
        content: input,
      });
      console.log("RESPONSE", response);
    } catch (error) {
      console.error("error while posting", error);
    }
    // after post empty state variable 
    setPosts((prevPosts) => [...prevPosts, { user_id: id,  content: input }]);
    setInput("");
    setTitle("");

  };

  useEffect(() => {
    //cycles through prompts every 3 seconds
    const prompts = [
      "computer science...",
      "tech...",
      "getting a tech job...",
      "software engineering...",
    ];
    let activePrompt = 0;
    const interval = setInterval(() => {
      setActivePlaceholder(`Ask anything about ${prompts[activePrompt]}`);
      activePrompt = activePrompt + 1 === prompts.length ? 0 : activePrompt + 1;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const isInputEmpty = input.length == 0;

  return (
    makePost && (
      <div
        onClick={() => {
          setMakePost(false);
          setInput("");
        }}
        className="hidden md:flex justify-center items-center absolute h-full w-full bg-black bg-opacity-40 z-50"
      >
        {/* actual post screen */}
        {/* stopPropagation prevents click affecting onClick in parent div */}
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex flex-col justify-center items-center h-3/4 w-1/3 bg-slate-600 rounded-2xl shadow-lg"
        >
          <div
            className="flex justify-center items-center border-b border-black h-1/6 w-full"
            style={{
              fontFamily: "Verdana",
              fontSize: "22px",
              color: "black",
            }}
          >
            Create a Post
          </div>

          {/* user profile information */}
          <div className="flex-col w-full h-5/6">
            <div className="flex w-full h-1/4 ">
              {/* profile picture */}
              <div className="flex h-full w-2/3 ">
                <div className="flex h-full w-1/2 pl-16 items-center ">
                  <BsCircleFill size={82} style={{ color: "black" }} />
                </div>

                <div className="flex-col w-1/2 pt-10">
                  {/* Name */}
                  <div style={{ fontSize: "14px" }}>REAL_NAME</div>

                  {/* Username */}
                  <div style={{ fontSize: "12px" }}>@USER_NAME</div>
                </div>
              </div>

              {/* setting icon */}
              <div className="flex w-1/3 justify-end pr-2">
                <BsThreeDots
                  size={26}
                  style={{ color: "black" }}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="flex w-full justify-center pt-4 h-3/5">
              <textarea
                className="w-5/6 h-4/5 p-4 rounded-xl border bg-white shadow resize-none"
                placeholder={placeholder}
                value={input}
                onChange={handleInputChange}
              />
            </div>

            {/* add picture for future */}
            <div className="flex w-full h-3/20 ">
              {/* Picture may go here */}
              <div className="flex h-full w-4/5 "></div>

              <div className="flex h-full w-1/5 justify-center items-center">
                <button
                  onClick={handlePostClick}
                  disabled={isInputEmpty}
                  className={`px-4 py-2 rounded-2xl ${
                    input
                      ? "bg-blue-800 text-white"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
