import { useState, useEffect } from "react";

const getOrientation = () => window.screen.orientation.type;

const useScreenOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(
    getOrientation().includes("portrait") ? true : false
  );

  const updateOrientation = () => {
    setIsPortrait(getOrientation().includes("portrait") ? true : false);
  };

  useEffect(() => {
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return isPortrait;
};

export default useScreenOrientation;
