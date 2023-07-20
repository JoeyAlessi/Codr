import { useEffect } from "react";
import axios from "axios";

export const useSession = () => {
  useEffect(() => {
    // useEffect only takes sync functions, so have to create sync and call func inside useEffect
    async function checkSession() {
      const user_token = localStorage.getItem("jwt_token");

      await axios.post("http://127.0.0.1:8000/api/login", {
        token: user_token,
      });
    }
    // aquire token from local storage (should become cookies later)
    checkSession();
  }, []);
};
