import { useNavigate } from "react-router-dom";
import "./Profile.css";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue, BiCircle } from "react-icons/bi";
import { BsCircleFill, BsFillPersonFill } from "react-icons/bs";
import { HiOutlineCog, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { run } from "../../utils";
import { NavBar } from "../main-feed/navbar";

export const Profile = () => {
  const navBarWidth = 64; // used for calculations regarding outside divs

  return (
    <div className="flex relative min-h-screen w-screen gradient-background-main">
      <NavBar />

      {/* div holding account page styling */}
      <div
        style={{ width: `calc(100% - ${navBarWidth}px)` }}
        className="flex justify-center items-center "
      >
        <div className="flex w-95-percent h-90-percent rounded-2xl bg-gray-600">
          <div className="flex flex-row h-1/4 w-full rounded-2xl justify-center">
            <div className="flex w-3/4 h-full">
              <div className="flex w-1/3 h-full justify-center items-center">
                <BsCircleFill size={140} style={{ color: "black" }} />
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
                    className="w-1/5 flex justify-center"
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

                  <div className="w-1/5 flex justify-center">
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
