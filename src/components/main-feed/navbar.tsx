import "../../components/main-feed/navbar.css"
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

  return handleSearchClick ? (
    
    <div className={`flex flex-col justify-start items-start h-screen w-16 transition-width ease-in-out duration-300 border-gray-500 border-r`}>
      <div className="h-1/5 w-full">
        <img
          src={EmptyLogo}
          alt="Logo"
          className="top-0 left-0 m-2 h-8 lg:h-[6vh] transition-height duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-col h-4/5 w-full">
        {/*Starting column of icons*/}
        <div
          className= "hover: cursor-pointer group flex h-16 w-full items-center justify-center hover:bg-gray-600 hover:rounded-md"
          onClick={() => navigate("/feed")}
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <AiOutlineHome
            size={32}
            className="transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
        </div>

        <div
          className="hover: cursor-pointer group flex h-16 w-full items-center justify-center hover:bg-gray-600 hover:rounded-md"
          onClick={() => {
            console.log(
              setHandleSearchClick(false),
              console.log(handleSearchClick)
            );
          }}
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <HiOutlineMagnifyingGlass
            size={32}
            className="transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
        </div>

        <div
          className="hover: cursor-pointer group flex h-16 w-full items-center justify-center hover:bg-gray-600 hover:rounded-md"
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <BiAddToQueue
            size={32}
            className="transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
        </div>
        <div
          className="hover: cursor-pointer group flex h-16 w-full items-center justify-center hover:bg-gray-600 hover:rounded-md"
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <BsFillPersonFill
            size={32}
            className="transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
        </div>
        <div
          className="hover: cursor-pointer group flex h-16 w-full items-center justify-center hover:bg-gray-600 hover:rounded-md"
          style={{ fontFamily: "Verdana", fontSize: "20px", color: "white" }}
        >
          <HiOutlineCog
            size={32}
            className="transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
        </div>
      </div>
    </div>
  ) : 
  
  
  
  (
    <div className={`flex flex-col justify-start items-start h-screen w-1/6 transition-width ease-in-out duration-300 border-gray-500 border-r`}>
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
            className="mr-2 transition-transform duration-100 group-hover:scale-110"
            style={{ color: "white" }}
          />
          <div className="custom-transition-width animate-slide-in-left">Home</div>
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
            <div className="custom-transition-width animate-slide-in-left">Search</div>
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
            <div className="custom-transition-width animate-slide-in-left">Post</div>
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
            <div className="custom-transition-width animate-slide-in-left">Account</div>
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
            <div className="custom-transition-width animate-slide-in-left">Settings</div>
        </div>
      </div>
    </div>
  );
};
