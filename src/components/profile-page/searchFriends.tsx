import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

type SearchFriendsProps = {
  checkFriends: boolean;
  setCheckFriends: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchFriends = ({
  checkFriends,
  setCheckFriends,
}: SearchFriendsProps) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const my_username = useAppSelector((state) => state.userState.user?.username);

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) {
        setSearchResults([]); // Clear results when input is empty
        return;
      }
      try {
        // Await the async call to axios.get and store the response
        setIsLoading(true);
        const response = await axios.post(
          "http://127.0.0.1:8000/user/search_friends",
          {
            query: inputValue,
            username: my_username,
          },
          { withCredentials: true }
        );
        console.log("RESPONSE", response.data);
        setIsLoading(false);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      {checkFriends && (
        <div
          onClick={() => setCheckFriends(false)}
          className="flex absolute justify-center items-center h-full w-full bg-black bg-opacity-40"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex flex-col justify-start items-center h-1/2 w-1/3 mt-6 bg-slate-600 rounded-2xl"
          >
            {/* input bar */}
            <div className="flex w-full h-1/6 justify-center items-center border-b-2">
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
                className="pl-3 h-10 w-3/4 rounded-md bg-gray-700"
                maxLength={25}
              ></input>
            </div>

            <div className="flex flex-col w-full h-5/6 justify-start items-center">
              {isLoading ? (
                <div className="flex w-full h-5/6 justify-center items-center">
                  <ClipLoader
                    color="#00000"
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                searchResults.map((profile, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(`/profile/${profile}`);
                      setCheckFriends(false); // Setting fetchUsers to false when div is clicked.
                    }}
                    className="flex mt-2 h-12 w-3/4 rounded-xl hover: cursor-pointer bg-slate-400 text-black"
                  >
                    <div className="flex items-center pl-2 w-3/5  ">{`@${profile}`}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
