import { useRef, useEffect } from "react";

// https://stackoverflow.com/a/63776262
export const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};
