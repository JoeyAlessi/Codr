import "../../components/main-feed/navbar.css";
import { useNavigate } from "react-router-dom";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineCog, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const searching_navBar_width = 65;
  const non_searching_navBar_width = 250;
  const searchBar_width = 150;

  return handleSearchClick ? (
    <>
      <div
        style={{
          width: `${searching_navBar_width}px`,
          transition: "width 0.3s ease-in-out", // Adjust the duration and timing function as needed
        }}
        className={`flex flex-col justify-start items-start h-screen border-gray-500 border-r `}
      >
        <div className="h-1/5 w-full">
          <img
            src={EmptyLogo}
            alt="Logo"
            className="top-0 left-0 m-2 h-8 lg:h-[6vh] transition-height duration-300 ease-in-out"
          />
        </div>

        <div className="flex flex-col h-4/5 w-full">
          {/* Starting column of icons */}
          <div className="group flex cursor-pointer h-16 w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
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
            onClick={() => {
              console.log(
                setHandleSearchClick(false),
                console.log(handleSearchClick)
              );
            }}
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

          <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
            <div
              onClick={() => {
                // Your click event code here
              }}
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

          <div className="group flex h-16 cursor-pointer w-full items-center justify-start hover:bg-gray-600 hover:rounded-md">
            <div
              onClick={() => {
                // Your click event code here
              }}
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
              onClick={() => {
                // Your click event code here
              }}
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
      {/*Going to become seperate component*/}
    
    </>
  ) : (
    <div style={{
        width: `${non_searching_navBar_width}px`,
        transition: "width 0.3s ease-in-out", // Adjust the duration and timing function as needed
      }}
      className={`flex flex-col justify-start items-start h-screen border-gray-500 border-r`}
    >
      <div className="h-1/5 w-full">
        <img
          src={EmptyLogo}
          alt="Logo"
          className="top-0 left-0 m-2 h-8 lg:h-[9vh] transition-height duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-col h-4/5 w-full">
        {" "}
        {/*Starting column of icons*/}
        <div
          className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center hover:bg-gray-600 hover:rounded-md initial-delayed-animation"
          onClick={() => navigate("/feed")}
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
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
          onClick={() => {
            console.log(
              setHandleSearchClick(true),
              console.log(handleSearchClick)
            );
          }}
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <HiOutlineMagnifyingGlass
            size={32}
            className="mr-2 transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
          <div className="custom-transition-width-left">Search</div>
        </div>
        <div
          className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <BiAddToQueue
            size={32}
            className="mr-2 transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
          <div className="custom-transition-width-left">Post</div>
        </div>
        <div
          className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <BsFillPersonFill
            size={32}
            className="mr-2 transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
          <div className="custom-transition-width-left">Account</div>
        </div>
        <div
          className="pl-4 hover: cursor-pointer group flex h-16 w-full items-center  hover:bg-gray-600 hover:rounded-md"
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <HiOutlineCog
            size={32}
            className="mr-2 transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
          <div className="custom-transition-width-left">Settings</div>
        </div>
      </div>
    </div>
  );
};
