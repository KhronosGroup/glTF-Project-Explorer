import { useEffect, useState } from "react";

const getWindowDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleWindowResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowDimensions;
};
