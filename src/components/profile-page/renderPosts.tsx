import { BsCircleFill, BsThreeDots } from "react-icons/bs";
import { Post } from "../../services/types";
import { PostComment } from "../main-feed/postcomment";
import { useAppSelector } from "../../redux/store";

type RenderPostsProp = {
  checkPosts: boolean;
  setCheckPosts: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[];
  username: string | undefined;
  isCommenting: boolean;
  setIsCommenting: React.Dispatch<React.SetStateAction<boolean>>;
  commentingPost: Post;
  setCommentingPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
};

export const RenderPosts = ({
  checkPosts,
  setCheckPosts,
  posts,
  username,
  isCommenting,
  setIsCommenting,
  commentingPost,
  setCommentingPost,
}: RenderPostsProp) => {
  const my_ID = useAppSelector((state) => state.userState.user?.id);

  return (
    <div>
      {isCommenting && (
        <PostComment
          setIsCommenting={setIsCommenting}
          commentingPost={commentingPost!}
          my_ID={my_ID!}
        />
      )}
      {checkPosts && (
        <div
          onClick={() => setCheckPosts(false)}
          className="flex absolute justify-center items-center h-full w-full bg-black bg-opacity-40"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex justify-start h-4/5 w-4/5 mt-6 bg-slate-600 rounded-2xl flex-wrap overflow-y-auto hide-scrollbar"
          >
            <div
              style={{ fontSize: 32 }}
              className="flex h-16 w-full justify-center items-center bg-slate-800 border-b"
            >
              {`${username}'s Posts`}
            </div>
            {posts.map((post, index) => (
              <div
                onClick={() => {
                  setIsCommenting(true);
                  setCommentingPost(post);
                  setCheckPosts(false);
                }}
                key={index}
                style={{ height: "300px", width: "387px" }}
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
  );
};
