import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const run = <T>(f: () => T): T => f();

// function here for performance
// any component/file that uses this function will be updated when this function is updated

export const fetchUserProfile = async (
  profile_name: string | undefined,
  navigate: NavigateFunction
): Promise<string[] | undefined> => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/user/${profile_name}/profile`
    );

    console.log("Response", response.data);
    return response.data;

    navigate("/profile");
  } catch (error: any) {
    console.log("Error:", error);
  }
};
