import { useEffect, useState } from "react";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import "./topicselection.css";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { RootState } from "../../redux/store";
import axios from "axios";
import { useAppSelector } from "../../redux/store";

const topicselection = () => {
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.user.username);

  const topics = [
    "Programming Fundamentals",
    "Data Structures",
    "Algorithms",
    "Object-Oriented Programming",
    "Database Management",
    "Computer Networks",
    "Operating Systems",
    "Interview Preparation: Data Structures",
    "Interview Preparation: Algorithms",
    "Interview Preparation: System Design",
    "Interview Preparation: Object-Oriented Programming",
    "Interview Preparation: Problem Solving Techniques",
  ];

  const [selectedTopicIndex, setSelectedTopicIndices] = useState<number[]>([]);
  const [threeTopicsSelected, setThreeTopicsSelected] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false); // A little buggy, when first being used

  const handleButtonClick = (index: number) => {
    setSelectedTopicIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        if (prevSelectedIndices.length >= 4) {
          // detecting if deletion of topic will still meet 3 topic requirement
          setThreeTopicsSelected(true);
        } else {
          setThreeTopicsSelected(false);
        }
        return prevSelectedIndices.filter((i) => i !== index);
      } else {
        if (prevSelectedIndices.length >= 2) {
          setThreeTopicsSelected(true);
        } else {
          setThreeTopicsSelected(false);
        }
        return [...prevSelectedIndices, index];
      }
    });
  };

  const joinCodr = async () => {
    const selectedTopics = selectedTopicIndex.map((index) => topics[index]);
    console.log(selectedTopics);

    await axios.post("http://127.0.0.1:8000/api/interests", {
      username: username,
      interests: selectedTopics,
    });
    navigate("/feed");
  };

  const buttonClassName = (index: number) =>
    `${
      selectedTopicIndex.includes(index)
        ? "button-pressed shadow-none"
        : "button-default shadow-grey"
    } text-white font-bold py-2 px-4 rounded m-2 flex-wrap rounded-2xl`;

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024); // Adjust the threshold as per your requirements
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient">
      <div className="flex flex-col justify-center min-h-screen px-8 md:px-10 lg:px-14">
        <img
          src={EmptyLogo}
          alt="Logo"
          className="absolute top-0 left-0 m-2 h-[7vh] md:h-[9vh] lg:h-[10vh] "
        />
        {/* <header className="mt-5 md:mt-10 lg:mt-14"></header> */}

        <div className="flex flex-col space-y-10 md:space-y-0 lg:flex-row md:space-x-4 items-center justify-center">
          {/* Main */}
          <main className="w-full md:w-full lg:w-5/12 px-7 py-8 mb-auto text-center lg:px-0 lg:text-left">
            <h1
              className="topicheader text-7xl font-bold"
              style={{ color: "#C1A2CA" }}
            >
              Welcome to Codr,
            </h1>
            <h2
              className="topicsubheader marker:text-5xl font-bold mt-4"
              style={{ color: "#3A6883" }}
            >
              What tech topics are you interested in?
            </h2>

            <div className="flex justify-center items-center">
              {isLargeScreen && threeTopicsSelected && (
                <button
                  className="join-button text-white font-300 py-2 px-6 rounded-xl disabled:opacity-50 mt-20 animate-fade-in"
                  disabled={!threeTopicsSelected}
                  onClick={() => joinCodr()}
                >
                  Join Codr
                </button>
              )}
            </div>
          </main>

          {/* SideBar */}
          <aside className="flex flex-wrap justify-center w-full lg:w-7/12 px-5 py-8">
            <p className="w-full text-center text-xl my-5">
              Please choose at least 3 topics to proceed.
            </p>

            {topics.map((topic, index) => (
              <button
                key={index}
                className={buttonClassName(index)}
                onClick={() => handleButtonClick(index)}
              >
                <div className="">{topic}</div>
              </button>
            ))}

            <div className="flex justify-center items-center">
              {!isLargeScreen && threeTopicsSelected && (
                <button
                  className="join-button text-white font-300 py-2 px-6 rounded-xl disabled:opacity-50 mt-10"
                  disabled={!threeTopicsSelected}
                  onClick={() => joinCodr()}
                >
                  Join Codr
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default topicselection;
