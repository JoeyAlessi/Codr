import "../../components/main-feed/navbar.css";
import { useNavigate } from "react-router-dom";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineCog, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Dispatch, SetStateAction } from "react";
import { run } from "../../utils";
import { SearchBarTab } from "./searchTab";
import { useScreenSize } from "../../hooks/useScreenSize";
import { PostCard } from "../posts/postcard";

type NavBarProps = {
  handleSearchClick: boolean;
  setHandleSearchClick: Dispatch<SetStateAction<boolean>>;
  makePost: boolean;
  setMakePost: Dispatch<SetStateAction<boolean>>;
};

export const NavBar = ({
  handleSearchClick,
  setHandleSearchClick,
  makePost,
  setMakePost,
}: NavBarProps) => {
  const navigate = useNavigate();
  // from custom hook useScreenSize
  // --- it is finding the size of the screen
  // --- could be used for readjusting screen size
  const { isLargeScreen, isMediumScreen } = useScreenSize();
  const navBarWidth = 385; // used for calculations regarding outside divs

  return (
    <>
      {/* Post Component */}

      <PostCard
      makePost={makePost}
      setMakePost={setMakePost}
      />

      {handleSearchClick ? (
        <>
          <div
            className={`hidden sm:flex w-16 min-w-[64px] flex-col justify-start items-start h-screen transition-width ease-in-out duration-300 border-gray-500 border-r `}
          >
            {/* transparent div */}
            <div
              style={{
                width: `calc(100% - ${navBarWidth}px)`,
              }}
              className="fixed top-0 bottom-0 right-0 h-full bg-transparent z-10"
              onClick={() => setHandleSearchClick(false)}
            ></div>

            <div className="h-1/5 w-full">
              <img
                src={EmptyLogo}
                alt="Logo"
                className="top-0 left-0 p-2 lg:h-[8vh] transition-height duration-300 ease-in-out"
              />
            </div>

            <div className="flex flex-col h-4/5 w-full">
              {/* Starting column of icons */}
              <div className="flex group cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                <div
                  onClick={() => navigate("/feed")}
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <AiOutlineHome
                    size={32}
                    className="transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white", marginLeft: "1rem" }}
                  />
                </div>
              </div>

              <div
                className="group flex cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
                onClick={() => setHandleSearchClick(false)}
              >
                <div
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <HiOutlineMagnifyingGlass
                    size={32}
                    className="transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white", marginLeft: "1rem" }}
                  />
                </div>
              </div>

              <div
                onClick={() => setMakePost(true)}
                className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
              >
                <div
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <BiAddToQueue
                    size={32}
                    className="transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white", marginLeft: "1rem" }}
                  />
                </div>
              </div>

              <div
                onClick={() => {
                  navigate("/profile");
                }}
                className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
              >
                <div
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <BsFillPersonFill
                    size={32}
                    className="transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white", marginLeft: "1rem" }}
                  />
                </div>
              </div>

              <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                <div
                  style={{
                    fontFamily: "Verdana",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <HiOutlineCog
                    size={32}
                    className="transition-transform duration-100 group-hover:scale-110"
                    style={{ color: "white", marginLeft: "1rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <SearchBarTab />
        </>
      ) : (
        <>
          {run(() => {
            if (isLargeScreen) {
              return (
                <div
                  className={`hidden lg:flex flex-col justify-start items-start h-screen w-64 transition-width ease-in-out duration-300 border-gray-500 border-r`}
                >
                  <div className="h-1/5 w-full">
                    <img
                      src={EmptyLogo}
                      alt="Logo"
                      className="top-0 left-0 m-2 h-8 lg:h-[9vh] transition-height duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col h-4/5 w-full">
                    <div
                      className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center hover:bg-gray-600 hover:rounded-md"
                      onClick={() => navigate("/feed")}
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      <AiOutlineHome
                        size={32}
                        className="mr-2 transition-transform duration-100 group-hover:scale-110 "
                        style={{ color: "white" }}
                      />
                      <div className="custom-transition-width-left">Home</div>
                    </div>
                    <div
                      className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                      onClick={() => setHandleSearchClick(true)}
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      <HiOutlineMagnifyingGlass
                        size={32}
                        className="mr-2 transition-transform duration-100 group-hover:scale-110"
                        style={{ color: "white" }}
                      />
                      <div className="custom-transition-width-left">Search</div>
                    </div>

                    <div
                      onClick={() => setMakePost(true)}
                      className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      <BiAddToQueue
                        size={32}
                        className="mr-2 transition-transform duration-100 group-hover:scale-110"
                        style={{ color: "white" }}
                      />
                      <div className="custom-transition-width-left">Post</div>
                    </div>
                    <div
                      onClick={() => {
                        navigate("/profile");
                      }}
                      className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      <BsFillPersonFill
                        size={32}
                        className="mr-2 transition-transform duration-100 group-hover:scale-110"
                        style={{ color: "white" }}
                      />
                      <div className="custom-transition-width-left">
                        Account
                      </div>
                    </div>
                    <div
                      className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
                      style={{
                        fontFamily: "Verdana",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      <HiOutlineCog
                        size={32}
                        className="mr-2 transition-transform duration-100 group-hover:scale-110"
                        style={{ color: "white" }}
                      />
                      <div className="custom-transition-width-left">
                        Settings
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (isMediumScreen && !isLargeScreen) {
              return (
                <div
                  className={`flex w-16 flex-col justify-start items-start h-screen transition-width ease-in-out duration-300 border-gray-500 border-r `}
                >
                  <div className="h-1/5 w-full">
                    <img
                      src={EmptyLogo}
                      alt="Logo"
                      className="top-0 left-0 p-2 lg:h-[8vh] transition-height duration-300 ease-in-out"
                    />
                  </div>

                  <div className="flex flex-col h-4/5 w-full">
                    <div className="hidden sm:flex group cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                      <div
                        onClick={() => navigate("/feed")}
                        style={{
                          fontFamily: "Verdana",
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        <AiOutlineHome
                          size={32}
                          className="transition-transform duration-100 group-hover:scale-110"
                          style={{ color: "white", marginLeft: "1rem" }}
                        />
                      </div>
                    </div>

                    <div
                      className="group flex cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
                      onClick={() => setHandleSearchClick(true)}
                    >
                      <div
                        style={{
                          fontFamily: "Verdana",
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        <HiOutlineMagnifyingGlass
                          size={32}
                          className="transition-transform duration-100 group-hover:scale-110"
                          style={{ color: "white", marginLeft: "1rem" }}
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => setMakePost(true)}
                      className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
                    >
                      <div
                        style={{
                          fontFamily: "Verdana",
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        <BiAddToQueue
                          size={32}
                          className="transition-transform duration-100 group-hover:scale-110"
                          style={{ color: "white", marginLeft: "1rem" }}
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        navigate("/profile");
                      }}
                      className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md"
                    >
                      <div
                        style={{
                          fontFamily: "Verdana",
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        <BsFillPersonFill
                          size={32}
                          className="transition-transform duration-100 group-hover:scale-110"
                          style={{ color: "white", marginLeft: "1rem" }}
                        />
                      </div>
                    </div>

                    <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
                      <div
                        style={{
                          fontFamily: "Verdana",
                          fontSize: "20px",
                          color: "white",
                        }}
                      >
                        <HiOutlineCog
                          size={32}
                          className="transition-transform duration-100 group-hover:scale-110"
                          style={{ color: "white", marginLeft: "1rem" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              // will add something in the final else statement to render in the future. Possibly navbar on the bottom of the screen or hamburger menus
              return <></>;
            }
          })}
        </>
      )}
    </>
  );
};
