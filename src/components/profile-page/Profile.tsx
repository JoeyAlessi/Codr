import "./Profile.css";
import { useEffect, useState } from "react";
import { NavBar } from "../main-feed/navbar";
import { BsCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { UserActions } from "../../redux/reducers/user";

export const Profile = () => {
  const [handleSearchClick, setHandleSearchClick] = useState(false);
  const [makePost, setMakePost] = useState(false);
  // profileName will eventually hold all user info including followers + following
  const [profileName, setProfileName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navBarWidth = 64; // used for calculations regarding outside divs
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.userState.user?.username);
  const { profile } = useParams();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/user/${profile}/profile`
        );
        // eventually put all response data in one state variable
        setProfileName(response.data.username); // Store the user data in state
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error:", error);
      }
    };

    fetchUserProfile();
  }, [profile]);

  const logoutUser = async () => {
    // logic only for logged in user
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        { username: username },
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
      <NavBar
        handleSearchClick={handleSearchClick}
        setHandleSearchClick={setHandleSearchClick}
        makePost={makePost}
        setMakePost={setMakePost}
      />
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
            <div className="loader">Loading...</div>
          </div>
        ) : (
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
                      {profileName}
                    </div>

                    <div className="w-4/5 flex justify-evenly">
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
                        onClick={
                          () => {
                            logoutUser();
                          }
                          // dispatch({ type: UserActions.Login, payload: {user: User} });
                        }
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
        )}
      </div>
    </div>
  );
};
