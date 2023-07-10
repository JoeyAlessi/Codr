import React, { useState } from "react";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import "./topicselection.css";
import { useNavigate } from "react-router-dom";

const topicselection = () => {
  const navigate = useNavigate();

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

  //rgb for pressed button:
  // const buttonClassName = `${isPressed ? 'shadow-none' : 'shadow'} ${isPressed ? 'bg-blue-700' : 'bg-blue-400'} text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded`
  const buttonClassName = (index: number) =>
    `${
      selectedTopicIndex.includes(index) ? "button-pressed" : "button-default"
    } text-white font-bold py-2 px-4 rounded m-2 flex-wrap rounded-2xl`;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient">
      <div className="flex flex-col justify-center min-h-screen px-8 md:px-10 lg:px-14">
        <header className="mt-5 md:mt-10 lg:mt-14">
        <img src={EmptyLogo} alt="Logo" className="absolute top-0 left-0 m-2 h-8 lg:h-[10vh] " />

        </header>
    
        <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-4 items-center justify-center">
        <main className="w-full md:w-5/12 px-7 py-10 mb-auto">
            <h1 className="text-7xl font-bold" style={{color: "#C1A2CA"}}>
              Welcome to Codr,
            </h1>
            <h2 className="text-4xl font-bold mt-4" style={{color: "#3A6883"}}>
              What tech topics are you interested in?
            </h2>
          </main>
        
          <aside className="flex flex-wrap justify-center w-full md:w-1/2 px-5 py-10">
              <p className = "w-full text-center text-xl my-5">Please choose at least 3 topics to proceed.</p>

            {topics.map((topic, index) => (
              <button
                key={index}
                className={buttonClassName(index)}
                onClick={() => handleButtonClick(index)}
              >
                <div className="topic">{topic}</div>
              </button>
            ))}
        <div className="w-full flex justify-center mb-5">
          <div className = "placeholder">
          {!threeTopicsSelected ? ("") : (<button
            className="join-button text-white font-300 py-2 px-4 rounded-lg m-2 disabled:opacity-50 my-5"
            disabled={!threeTopicsSelected}
            onClick={() => navigate('/feed')}
          >
            Join Codr 
          </button>) 
          }
          </div>
        </div>
          </aside>
        </div>


      </div>
    </div>
  );
};

export default topicselection;