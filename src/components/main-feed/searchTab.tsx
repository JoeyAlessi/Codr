import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { fetchUserProfile } from "../../utils";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
//  } from "react-router-dom"
// Function to handle clicks on the transparent div
export const SearchBarTab = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  // const [searchResultsloading, setSearchResultsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const username = useAppSelector((state) => state.userState.user?.username);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) {
        setSearchResults([]); // Clear results when input is empty
        return;
      }

      try {
        // setSearchResultsLoading(true);
        // Await the async call to axios.get and store the response
        console.log("INPUTVALUE", inputValue);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/search-users",
          {
            query: inputValue,
            username: username,
          },
          { withCredentials: true }
        );
        console.log("RESPONSE", response.data);

        // Set the search results with the data returned from the response
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // setSearchResultsLoading(false);
        // Handle the error appropriately here, e.g., set an error state
      }
    };

    fetchData();
  }, [inputValue]);

  return (
    <>
      <div
        className={`hidden md:flex min-w-[320px] custom-transition-width-left delay-700 rounded-tr-3xl rounded-br-3xl flex-col justify-start items-start h-screen transition-width ease-in-out duration-300 border-black-500 border-r`}
      >
        <div className="flex flex-col w-full items-center pt-32">
          <input
            onChange={handleInputChange}
            id="search-input"
            type="text"
            placeholder="Search"
            style={{
              fontFamily: "Verdana",
              fontSize: "16px",
              color: "white",
            }}
            className="pl-3 h-8 w-3/4 rounded-md bg-gray-700"
            maxLength={25}
          ></input>

          {/* where to render people */}
          <div className="mt-4 w-10/12 ">
            {searchResults.map((profile, index) => (
              <div
                key={index}
                onClick={() => {
                  // setProfileLul(profile);

                  navigate(`/profile/${profile}`);
                }}
                className="flex mb-2 h-10 rounded-xl hover: cursor-pointer bg-slate-400 text-black "
              >
                <div className="flex items-center pl-2 w-3/5  ">{`@${profile}`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
