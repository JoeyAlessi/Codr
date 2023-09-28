import "./Profile.css";
import { useState } from "react";
import { NavBar } from "../main-feed/navbar";
import { BsCircleFill } from "react-icons/bs";

export const Profile = () => {
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const [makePost, setMakePost] = useState(false);
  const navBarWidth = 64; // used for calculations regarding outside divs

  return (
    <div className="flex relative min-h-screen w-screen gradient-background-main">
      <NavBar
        handleSearchClick={handleSearchClick}
        setHandleSearchClick={setHandleSearchClick}
        makePost={makePost}
        setMakePost={setMakePost}
      />
      {/* turnary statement to render transparent div */}

      {/* div holding account page styling */}
      <div
        style={{ width: `calc(100% - ${navBarWidth}px)` }}
        className="flex justify-center items-center "
      >
        <div className="flex w-95-percent h-90-percent rounded-2xl bg-gray-600 ">
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
                    Joe Alessi
                  </div>

                  <div className="w-2/5 flex justify-center">
                    <button
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "18px",
                        color: "black",
                      }}
                      className="flex items-center"
                    >
                      Edit Account
                    </button>
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
                    {/* {Add amount of posts before word} */}0 Posts
                  </div>

                  <div className="w-2/5 flex justify-center">
                    {/* {Add amount of followers before word} */}0 Followers
                  </div>

                  <div className="w-1/4 flex justify-center">
                    {/* {Add amount following before word} */}0 Following
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
