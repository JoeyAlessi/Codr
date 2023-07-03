import React from 'react';
import './Home.css';
import Hand from "../../assets/ai-nuclear-energy-background-future-innovation-disruptive-technology-removebg.png";
import EmptyLogo from "../../assets/Logo/Empty_Logo.png";
import {Link} from 'react-router-dom'

const Home = () => {
  

  return (
    <div className = "landing-page overflow-hidden"> {/*Added this to hide sidebar scroller*/}
      <div className="relative flex flex-col justify-center items-start h-screen w-screen bg-gradient p-0 m-0">
        <img src={EmptyLogo} alt="Logo" className="absolute top-0 left-0 m-2 h-8 lg:h-[10vh] " />
        <div className = "container-for-header-animation"> {/*Added this to fix the header animation*/}
           <h1 className="header text-primary">codr</h1>
        </div>
        <h2 className="subheader text-secondary font-light m-2">Connecting code and curiosity.</h2>

        <Link to="/sign">
        <button className="btn-start px-15 py-3 text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-semibold mb-8 text-center">Get Started</button>
        </Link>

        <img src={Hand} alt="Hand" className="robot-hand absolute bottom-0 right-0 w-auto h-[30vh] md:h-[40vh] lg:h-[60vh] xl:h-[80vh]" />

      </div>

    </div>
  );
}

export default Home;