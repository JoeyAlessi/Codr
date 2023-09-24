import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../redux/reducers/user";
import { User } from "../services/types";

export const useSession = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // useEffect only takes sync functions, so have to create sync and call func inside useEffect
    async function checkSession() {
      try {
        // automatically will send token in post request
        const response = await axios.post(
          "http://127.0.0.1:8000/api/authenticate",
          {},
          // needs with credentials to send http only cookies
          { withCredentials: true }
        );
        // if user cookie exists, populate redux with cookie info and send to feed page
        console.log("RESPONSE", response);
        const userInfo: User = {
          id: response.data.User.id,
          username: response.data.User.username,
          email: response.data.User.email,
          followers: response.data.User.followers,
          following: response.data.User.following,
        };

        dispatch({ type: UserActions.Login, payload: { user: userInfo } });

        navigate("/feed");
      } catch (error: any) {
        //. if no cookie exists, user must sign in manually
        console.log("ERROR", error);
        console.error(error.response.data.Error);
        navigate("/sign");
      }
    }
    checkSession();
  }, []);
};
