import { useEffect, useState } from "react";

export function useScreenSize() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      const largeScreenThreshold = 1024;
      const mediumScreenThreshold = 768;

      setIsLargeScreen(screenWidth >= largeScreenThreshold);
      setIsMediumScreen(screenWidth >= mediumScreenThreshold);
    }

    // Call handleResize initially to set the initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return the state variables
  return { isLargeScreen, isMediumScreen };
}
