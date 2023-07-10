import React, { useState } from "react";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";

const topicselection = () => {

  const topics = [
    "Programming Fundamentals",
    "Data Structures",
    "Algorithms",
    "Object-Oriented Programming",
    "Database Management",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Web Development",
    "Mobile App Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Computer Graphics",
    "Human-Computer Interaction",
    "Cloud Computing",
    "Big Data",
    "Natural Language Processing",
    "Blockchain",
    "Internet of Things",
    "Parallel and Distributed Computing",
    "Compilers",
    "Computer Architecture",
    "Robotics",
    "Computer Vision",
    "Game Development",
    "Virtual Reality",
    "Augmented Reality",
    "Bioinformatics",
    "Quantum Computing",
    "Ethical Hacking",
    "Cryptography",
    "Network Security",
    "Software Testing",
    "Functional Programming",
    "Concurrent Programming",
    "Computer Ethics",
    "Data Visualization",
    "Information Retrieval",
    "Computer Hardware",
    "System Design",
    "Data Mining",
    "Cloud Security",
    "Wireless Networks",
    "Computer Forensics",
    "Embedded Systems",
    "Natural Computing",
    "Neural Networks",
    "Interview Preparation: Data Structures",
    "Interview Preparation: Algorithms",
    "Interview Preparation: System Design",
    "Interview Preparation: Object-Oriented Programming",
    "Interview Preparation: Problem Solving Techniques",
  ];

  const [selectedTopicIndex, setSelectedTopicIndices] = useState<number[]>([]);

  const handleButtonClick = (index: number) => {
    setSelectedTopicIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)){
        return prevSelectedIndices.filter((i) => i !== index);
      }else{
        return[...prevSelectedIndices, index];
      }
    })
  };

  //rgb for pressed button:
  // const buttonClassName = `${isPressed ? 'shadow-none' : 'shadow'} ${isPressed ? 'bg-blue-700' : 'bg-blue-400'} text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded`
  const buttonClassName = (index: number) =>
    `${
      selectedTopicIndex.includes(index) ? "bg-blue-700" : "bg-blue-400"
    } text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded m-2 flex-wrap`;

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-gradient">
      <div className="min-h-screen flex flex-col">
        <header className="p-8 md:p-10 lg:p-14">
          <img
            src={EmptyLogo}
            alt="Logo"
            className="absolute top-0 left-0 m-2 h-[6vh] md:h-[7vh] lg:h-[10vh] "
          />
        </header>

        <div className="flex-grow my-5 w-screen flex flex-col md:flex-row md:space-x-4 md:space-y-0">
          <main className="w-4/9 md:w-4/9 lg:w-4/9 px-5 py-40">
            {/* <h1 className="text-2xl md:text-4xl">Main Content</h1> */}
            <h1 className="topicheader text-8xl" style={{ color: "#C1A2CA" }}>
              Welcome to Codr,
            </h1>
            <h2
              className="topicsubheader text-4xl"
              style={{ color: "#3A6883" }}
            >
              What tech topics are you interested in?
            </h2>
          </main>

          <aside className=" md:w-5/9 lg:w-5/9 px-5 py-40">
       
            {topics.map((topic, index) => (
              <button
                key={index}
                className={buttonClassName(index)}
                onClick={() => handleButtonClick(index)}
              >
                {topic}
              </button>
            ))}
            <h1 className="text-2xl md:text-4xl"></h1>
          </aside>
        </div>

        <footer className="p-5">
          <h1 className="text-2xl md:text-4xl text-white">Footer</h1>
        </footer>
      </div>
    </div>
  );
};

export default topicselection;
