import { SetStateAction, useEffect, useState } from "react";
import { Post } from "../../services/types";
import { BsCircleFill, BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { Comment } from "../../services/types";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppSelector } from "../../redux/store";

type PostCommentProps = {
  setIsCommenting: React.Dispatch<SetStateAction<boolean>>;
  commentingPost: Post;
  my_ID: number;
};

export const PostComment = ({
  setIsCommenting,
  commentingPost,
  my_ID,
}: PostCommentProps) => {
  const my_username = useAppSelector((state) => state.userState.user?.username);
  const [isLoading, setIsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");

  const fetchPostComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/handle_comments?post_ID=${commentingPost.post_id}`
      );
      setPostComments(response.data);
      setIsLoading(false);
      console.log("Response", response);
    } catch (error: unknown) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    console.log("FETCHING COMMENTS");

    fetchPostComments();
  }, []);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const addComment = async () => {
    console.log("USERNAME", my_username);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/handle_comments`,
        {
          user_id: my_ID,
          post_id: commentingPost.post_id,
          comment: comment,
          username: my_username,
        }
      );
      setComment("");
      fetchPostComments();
      console.log("Response", response.data);
    } catch (error: unknown) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <div
        onClick={() => setIsCommenting(false)}
        className="flex absolute justify-center items-center h-full w-full bg-black bg-opacity-40"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="flex h-3/4 w-2/3 mt-6 bg-slate-900 rounded-2xl"
        >
          <div className="flex h-full w-3/5 ">
            <div className="flex flex-col h-full w-full bg-slate-500 rounded-lg mb-2">
              <div className="flex h-1/6 w-full bg-slate-700 rounded-tl-lg border-b-2 ">
                <div className="flex justify-end items-center h-full w-1/6">
                  <BsCircleFill size={40} style={{ color: "white" }} />
                </div>
                <div className="flex justify-start items-center h-full w-2/3 pl-2">
                  <p style={{ fontSize: 20 }}>{commentingPost.username}</p>
                </div>
                <div className="flex justify-center items-center h-full w-1/6 ">
                  <BsThreeDots
                    size={32}
                    style={{ color: "white" }}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex w-full h-5/6 p-4 break-all">
                {commentingPost.content}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/5 h-full ">
            {isLoading ? (
              <div className="flex justify-center items-center h-5/6 w-full">
                <ClipLoader
                  color="#00000"
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-start items-center h-5/6 w-full overflow-y-auto hide-scrollbar">
                {postComments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col min-h-[80px] h-20 w-[90%] rounded-md bg-slate-500 mt-2"
                  >
                    <div
                      className="flex h-1/5 w-full "
                      style={{ fontWeight: "bold" }}
                    >
                      {`@${comment.username}`}
                    </div>

                    <p
                      className="m-2 h-4/5 w-full break-all"
                      style={{ fontSize: 14 }}
                    >
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex h-1/6 w-full">
              <div className="flex h-full w-3/4 justify-end pr-4 items-center ">
                <input
                  onChange={handleCommentChange}
                  value={comment}
                  id="search-input"
                  type="text"
                  placeholder="Add a comment..."
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "16px",
                    color: "white",
                    height: 40,
                    width: 200,
                  }}
                  className="pl-3 h-8 w-3/4 rounded-md bg-gray-700"
                  maxLength={80}
                ></input>
              </div>
              <div className="flex justify-center items-center h-full w-1/4 ">
                <button
                  onClick={() => {
                    addComment();
                  }}
                  style={{
                    fontSize: 12,
                  }}
                  className="bg-slate-600"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
