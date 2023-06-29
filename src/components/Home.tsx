import React from 'react';
import './Home.css';
import Hand from "../assets/ai-nuclear-energy-background-future-innovation-disruptive-technology-removebg.png";
import EmptyLogo from "../assets/Logo/Empty_Logo.png";

const Home = () => {
  return (
    <div className="relative flex flex-col justify-center items-start h-screen w-screen bg-gradient p-0 m-0">
      <img src={EmptyLogo} alt="Logo" className="absolute top-0 left-0 m-2 h-12 lg:h-[12vh]" />
      <h1 className="header text-primary m-2">codr.</h1>
      <h2 className="subheader text-secondary font-light m-2">Connecting code and curiosity.</h2>
      <button className="btn-start m-2 px-4 py-2 rounded">Get Started</button>
      <img src={Hand} alt="Hand" className="absolute bottom-0 right-0 w-auto h-[40vh] md:h-[60vh] lg:h-[80vh] xl:h-[90vh]" />
    </div>
  );
}

export default Home;
