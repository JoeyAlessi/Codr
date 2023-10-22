import { useEffect } from "react";
import axios from "axios";
import { useHref, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../redux/reducers/user";
import { User } from "../services/types";

export const useSession = () => {
  const navigate = useNavigate();
  // const { params } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  console.log({ window });

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
        // if user cookie exists and is valid, populate redux with cookie info and send to feed page
        console.log("RESPONSE", response);
        const userInfo: User = {
          id: response.data.User.id,
          username: response.data.User.username,
          email: response.data.User.email,
        };

        dispatch({ type: UserActions.Login, payload: { user: userInfo } });
        console.log({ location });
        // only sends user to feed page if they are in signin at first app load
        if (location.pathname === "sign") {
          navigate("/feed");
        }
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
