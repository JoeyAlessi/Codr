import React, { useState } from "react";
import "./RegisterLogin.css";
import LogoText from "../../assets/Logo/LogoText.png";
import Text from "../../assets/Logo/Text.png";
import axios from "axios";

export const RegisterLogin = () => {
  const [register, setRegisterState] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        email: email, //objects sending to postgres db
        username: username,
        password: password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("error when registering user", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-gradient">
      <div className="glass-box sm:h-3/4 md:h-2/3 lg:h-1/2 xl:h-3/5 2xl:h-3/5 relative flex ">
        <img
          src={LogoText}
          alt="Logo"
          className="logo-top-left m-2 h-8 lg:h-[7vh]"
        />
        <div className="login-area w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 py-10">
          {!register ? (
            <>
              <h2 className="greeting text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-semibold mb-8 text-center">
                Welcome Back
              </h2>
              <input
                className="input-field mb-4 p-3 w-5/6 sm:w-3/4 "
                type="text"
                placeholder="Username"
              />
              <input
                className="input-field mb-8 p-3 w-5/6 sm:w-3/4"
                type="password"
                placeholder="Password"
              />
              <button className="btn-login py-3 px-4 w-5/6 sm:w-3/4 text-white text-center mb-2">
                Log In
              </button>
            </>
          ) : (
            <>
              <h2 className="greeting text-xl sm:text-2xl my-1 md:text-3xl lg:text-2xl xl:text-3xl font-semibold mb-8 text-center">
                Welcome to Codr!
              </h2>
              <input
                className="input-field mb-4 p-3 w-5/6 sm:w-3/4 "
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-field mb-4 p-3 w-5/6 sm:w-3/4 "
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input-field mb-8 p-3 w-5/6 sm:w-3/4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="greeting btn-login py-3 px-4 w-5/6 sm:w-3/4 text-white text-center mb-2"
                onClick={registerUser}
              >
                Register
              </button>
            </>
          )}

          <div className="w-full flex items-center justify-center my-2">
            <div className="line w-3/5 sm:w-1/5 bg-gray-300 h-0.5"></div>
            <p className="mx-2 text-xs sm:text-base text-gray-500">OR</p>
            <div className="line w-3/5 sm:w-1/5 bg-gray-300 h-0.5"></div>
          </div>
          <p className="text-lg text-gray-400 my-2">
            {register ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-pink-300 cursor-pointer"
              onClick={() => setRegisterState(!register)}
            >
              {register ? "Login here." : "Register here."}
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
