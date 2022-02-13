import { useEffect } from "react";

// NOTE: since listener is getting used in an use effect,
// it's possible to encounter stale state
// use the usestate callback to determine the any stateful values
export const useKeyDownCapture = (listener: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener(`keydown`, listener);

    return () => {
      document.removeEventListener(`keydown`, listener);
    };
  }, []);
};
