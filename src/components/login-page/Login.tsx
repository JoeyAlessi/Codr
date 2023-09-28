import { useState } from "react";
import { UserActions } from "../../redux/reducers/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoText from "../../assets/Logo/LogoText.png";
import Text from "../../assets/Logo/Text.png";
import { Register } from "../register-page/Register";
import { User } from "../../services/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // keeping strict types
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [register, setRegisterState] = useState(false);

  // const user_info2 = useSelector((state: UserState) => state); bad implementation
  const user_info = useAppSelector((state) => state.userState);
  console.log("USER_STATE", user_info);

  const loginUser = async () => {
    // where i should move it?
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      // if successful fill redux and navigate to feed page
      console.log("RESPONSE", response);
      const userInfo: User = {
        id: response.data.User.id,
        username: response.data.User.username,
        email: response.data.User.email,
      };

      dispatch({ type: UserActions.Login, payload: { user: userInfo } });

      setCredentialError("");
      navigate("/feed");
    } catch (error: any) {
      console.log("ERROR", error);
      console.error(error.response.data.Error);
      setCredentialError(error.response.data.Error);
    }
  };

  return register ? ( // if statement checking if Register component needs to be rendered or not
    <Register />
  ) : (
    <div className="relative flex items-center justify-center h-screen w-screen bg-gradient">
      <div className="glass-box sm:h-3/4 md:h-2/3 lg:h-4/6 h-5/6 relative flex ">
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src={LogoText}
            alt="Logo"
            className="logo-top-left m-2 h-8 lg:h-[7vh]"
          />
        </div>
        <div className="login-area w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 py-10">
          <h2 className="greeting text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-semibold mb-8 text-center">
            Welcome Back
          </h2>
          <input
            className="input-field mb-4 p-3 w-5/6 sm:w-3/4 "
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-field mb-8 p-3 w-5/6 sm:w-3/4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {credentialError && (
              <div className="text-red-500 text-xs mt-[-1rem] flex justify-center mb-[0.5rem]">
                {credentialError}
              </div>
            )}
          </div>
          <button
            className="btn-login py-3 px-4 w-5/6 sm:w-3/4 text-white text-center mb-2"
            onClick={loginUser}
          >
            Log In
          </button>

          <div className="w-full flex items-center justify-center my-2">
            <div className="line w-3/5 sm:w-1/5 bg-gray-300 h-0.5"></div>
            <p className="mx-2 text-xs sm:text-base text-gray-500">OR</p>
            <div className="line w-3/5 sm:w-1/5 bg-gray-300 h-0.5"></div>
          </div>
          <p className="text-lg text-gray-400 my-2">
            {"Don't have an account? "}
            <span
              className="text-pink-300 cursor-pointer"
              onClick={() => setRegisterState(!register)}
            >
              {"Register here."}
            </span>
          </p>
        </div>

        <div className="hidden md:block vertical-line"></div>

        <div className="w-0 lg:w-1/2 flex items-center justify-center relative">
          <img
            src={Text}
            alt="Logo"
            className="logo-right-top hidden lg:block"
          />
          <p className="text-right-top hidden lg:block">
            Connecting code and creativity.
          </p>
          <div className="cube hidden lg:block">
            <div className="side front"></div>
            <div className="side back"></div>
            <div className="side right"></div>
            <div className="side left"></div>
            <div className="side top"></div>
            <div className="side bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
